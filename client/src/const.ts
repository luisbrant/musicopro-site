export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

// Generate login URL at runtime so redirect URI reflects the current origin.
export const getLoginUrl = () => {
  const oauthPortalUrl = import.meta.env.VITE_OAUTH_PORTAL_URL;
  const appId = import.meta.env.VITE_APP_ID;
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);

  const url = new URL(`${oauthPortalUrl}/app-auth`);
  url.searchParams.set("appId", appId);
  url.searchParams.set("redirectUri", redirectUri);
  url.searchParams.set("state", state);
  url.searchParams.set("type", "signIn");

  return url.toString();
};

export const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=br.app.musicopro.app.twa";
export const PWA_URL = "https://app.musicopro.app.br";

export const isAndroidDevice = () => {
  if (typeof window !== "undefined" && typeof navigator !== "undefined") {
    const ua = navigator.userAgent || navigator.vendor || (window as any).opera;
    return /android/i.test(ua);
  }
  return false;
};

export const getAppUrl = () => {
  return isAndroidDevice() ? PLAY_STORE_URL : PWA_URL;
};

