import { useEffect, useState } from 'react';

// Tipos
interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
}

interface AttributionData {
  ref?: string;
  utm?: UTMParams;
  landing?: string;
  ts?: number;
}

// Constantes
const TTL_DAYS = 30;
const TTL_MS = TTL_DAYS * 24 * 60 * 60 * 1000;
const REF_REGEX = /^MP-[A-Za-z0-9-]{8,}$/;

// Funções utilitárias
const parseQueryParams = (): { ref?: string; utm: UTMParams } => {
  const params = new URLSearchParams(window.location.search);
  const ref = params.get('ref') || undefined;
  const utm: UTMParams = {};

  const utmKeys: (keyof UTMParams)[] = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_content',
    'utm_term',
  ];

  utmKeys.forEach((key) => {
    const value = params.get(key);
    if (value) utm[key] = value;
  });

  return { ref, utm: Object.keys(utm).length > 0 ? utm : {} };
};

const isValidRef = (ref?: string): boolean => {
  if (!ref || typeof ref !== 'string') return false;
  return REF_REGEX.test(ref);
};

const isValidUTM = (utm: UTMParams): boolean => {
  return !!(utm.utm_source || utm.utm_campaign);
};

const getCookie = (name: string): string | null => {
  const match = document.cookie.match(new RegExp(`(^|;\\s*)${name}=([^;]*)`));
  return match ? decodeURIComponent(match[2]) : null;
};

const setCookie = (name: string, value: string, days: number = TTL_DAYS): void => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${name}=${encodeURIComponent(value)}; ${expires}; Path=/; SameSite=Lax${secure}`;
};

const deleteCookie = (name: string): void => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; Path=/;`;
};

const isExpired = (ts?: number, days: number = TTL_DAYS): boolean => {
  if (!ts) return true;
  return Date.now() - ts > days * 24 * 60 * 60 * 1000;
};

const cleanUrlParams = (): void => {
  const params = new URLSearchParams(window.location.search);
  const hasRef = params.has('ref');
  const hasUTM = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].some(
    (key) => params.has(key)
  );

  if (hasRef || hasUTM) {
    // Remove ref e UTM params
    params.delete('ref');
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach((key) => {
      params.delete(key);
    });

    const newUrl = params.toString() ? `${window.location.pathname}?${params.toString()}` : window.location.pathname;
    window.history.replaceState({}, '', newUrl);
  }
};

const appendParamsToLinks = (selector: string, params: Record<string, string>): void => {
  const links = document.querySelectorAll(selector);
  links.forEach((link) => {
    const href = link.getAttribute('href') || '';
    if (!href) return;

    const url = new URL(href, window.location.origin);
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        url.searchParams.set(key, value);
      }
    });

    link.setAttribute('href', url.toString());
  });
};

const getStoredAttribution = (type: 'first' | 'last'): AttributionData | null => {
  const key = `mp_attrib_${type}`;
  
  // Tentar localStorage primeiro
  const stored = localStorage.getItem(key);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      localStorage.removeItem(key);
    }
  }

  // Fallback para cookie
  const cookieValue = getCookie(key);
  if (cookieValue) {
    try {
      return JSON.parse(cookieValue);
    } catch {
      deleteCookie(key);
    }
  }

  return null;
};

const setAttributionFirst = (data: AttributionData): void => {
  const existing = getStoredAttribution('first');
  if (existing) return; // Não sobrescrever

  const key = 'mp_attrib_first';
  const value = JSON.stringify(data);
  localStorage.setItem(key, value);
  setCookie(key, value);
};

const setAttributionLast = (data: AttributionData): void => {
  const key = 'mp_attrib_last';
  const value = JSON.stringify(data);
  localStorage.setItem(key, value);
  setCookie(key, value);
};

const storeRef = (ref: string): void => {
  // Verificar se já existe
  const existing = localStorage.getItem('mp_ref');
  if (!existing) {
    localStorage.setItem('mp_ref', ref);
  }
  
  // Sempre atualizar cookie
  setCookie('mp_ref', ref);
  setCookie('mp_ref_setAt', Date.now().toString());
};

const storeUTM = (utm: UTMParams): void => {
  const value = JSON.stringify(utm);
  localStorage.setItem('mp_utm', value);
  setCookie('mp_utm', value);
  setCookie('mp_utm_setAt', Date.now().toString());
};

const getStoredRef = (): string | null => {
  return localStorage.getItem('mp_ref') || getCookie('mp_ref');
};

const getStoredUTM = (): UTMParams | null => {
  const stored = localStorage.getItem('mp_utm') || getCookie('mp_utm');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  }
  return null;
};

const cleanExpiredData = (): void => {
  // Limpar ref expirado
  const refSetAt = localStorage.getItem('mp_ref_setAt') || getCookie('mp_ref_setAt');
  if (refSetAt && isExpired(parseInt(refSetAt))) {
    localStorage.removeItem('mp_ref');
    localStorage.removeItem('mp_ref_setAt');
    deleteCookie('mp_ref');
    deleteCookie('mp_ref_setAt');
  }

  // Limpar UTM expirado
  const utmSetAt = localStorage.getItem('mp_utm_setAt') || getCookie('mp_utm_setAt');
  if (utmSetAt && isExpired(parseInt(utmSetAt))) {
    localStorage.removeItem('mp_utm');
    localStorage.removeItem('mp_utm_setAt');
    deleteCookie('mp_utm');
    deleteCookie('mp_utm_setAt');
  }

  // Limpar atribuições inválidas
  ['first', 'last'].forEach((type) => {
    const key = `mp_attrib_${type}`;
    const stored = localStorage.getItem(key) || getCookie(key);
    if (stored) {
      try {
        JSON.parse(stored);
      } catch {
        localStorage.removeItem(key);
        deleteCookie(key);
      }
    }
  });
};

// Hook
export const useAttribution = () => {
  const [ref, setRef] = useState<string | null>(null);
  const [utm, setUTM] = useState<UTMParams | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isNewCapture, setIsNewCapture] = useState(false);

  useEffect(() => {
    // 1. Limpar dados expirados
    cleanExpiredData();

    // 2. Parsear query params
    const { ref: queryRef, utm: queryUTM } = parseQueryParams();

    // 3. Validar e armazenar
    let capturedRef: string | null = null;
    let capturedUTM: UTMParams | null = null;

    if (queryRef && isValidRef(queryRef)) {
      capturedRef = queryRef;
      storeRef(queryRef);
      setIsNewCapture(true);
    }

    if (queryUTM && Object.keys(queryUTM).length > 0 && isValidUTM(queryUTM)) {
      capturedUTM = queryUTM;
      storeUTM(queryUTM);
      setIsNewCapture(true);
    }

    // 4. Atribuição first-touch e last-touch
    if (capturedRef || capturedUTM) {
      const landing = window.location.pathname;
      const ts = Date.now();

      const attributionData: AttributionData = {
        ...(capturedRef && { ref: capturedRef }),
        ...(capturedUTM && { utm: capturedUTM }),
        landing,
        ts,
      };

      setAttributionFirst(attributionData);
      setAttributionLast(attributionData);
    }

    // 5. Limpar URL
    cleanUrlParams();

    // 6. Recuperar dados armazenados
    const storedRef = getStoredRef();
    const storedUTM = getStoredUTM();

    setRef(storedRef);
    setUTM(storedUTM);

    // 7. Mostrar banner se capturou ref nesta sessão
    if (capturedRef) {
      setShowBanner(true);
    }

    // 8. Propagar para links
    const params: Record<string, string> = {};
    if (storedRef) params['ref'] = storedRef;
    if (storedUTM) {
      Object.entries(storedUTM).forEach(([key, value]) => {
        if (value) params[key] = value;
      });
    }

    if (Object.keys(params).length > 0) {
      // Links do app
      appendParamsToLinks('a[data-go="app"], a[href*="/premium"]', params);
      // Links de compra
      appendParamsToLinks('a[data-go="buy"], a[href*="/pro"]', params);
    }
  }, []);

  const closeBanner = () => {
    setShowBanner(false);
  };

  return {
    ref,
    utm,
    showBanner,
    closeBanner,
    isNewCapture,
    getAttributionFirst: () => getStoredAttribution('first'),
    getAttributionLast: () => getStoredAttribution('last'),
  };
};
