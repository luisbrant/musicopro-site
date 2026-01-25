const CACHE_NAME = 'musico-pro-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

// Install Event: Cache core assets (local only)
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      console.log('[Service Worker] Caching core assets');
      try {
        await cache.addAll(ASSETS_TO_CACHE);
      } catch (e) {
        // Don't block install if something fails (e.g., first load race)
        console.warn('[Service Worker] Cache addAll failed:', e);
      }
    }).then(() => self.skipWaiting())
  );
});

return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activate Event: Cleanup old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('[Service Worker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  self.clients.claim();
});

// Fetch Event: Cache First, then Network (for libs) or Network First (for logic updates)
// Since index.html changes often during dev, we'll use Stale-While-Revalidate for it,
// and Cache First for the immutable CDN libs.
self.addEventListener('fetch', (event) => {
  // Check if it's an external library
  if (event.request.url.includes('cdn') || event.request.url.includes('cdnjs')) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then((response) => {
          // Cache new external requests dynamically
          if (!response || response.status !== 200 || response.type !== 'basic' && response.type !== 'cors') {
            return response;
          }
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          return response;
        });
      })
    );
  } else {
    // For local files (index.html), use Stale-While-Revalidate
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          const fetchPromise = fetch(event.request).then((networkResponse) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
          return cachedResponse || fetchPromise.catch(() => cachedResponse);
        });
      })
    );
  }
});
