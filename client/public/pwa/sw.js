const CACHE_NAME = 'musicopro-safe-v1.1';
const OFFLINE_PAGE = '/pwa/offline.html';

const CORE_ASSETS = [
  '/pwa/index.html',
  '/pwa/manifest.json',
  '/pwa/icons/icon-192.png',
  '/pwa/icons/icon-512.png',
  OFFLINE_PAGE
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Only control our scope (/pwa/)
  if (!event.request.url.includes('/pwa/')) return;

  // For navigation requests: network first, fallback to offline page
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((resp) => {
          // Update cached shell opportunistically
          const copy = resp.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put('/pwa/index.html', copy)).catch(() => {});
          return resp;
        })
        .catch(() => caches.match(OFFLINE_PAGE))
    );
    return;
  }

  // For other requests: cache if available, else network
  event.respondWith(
    caches.match(event.request).then((resp) => resp || fetch(event.request))
  );
});
