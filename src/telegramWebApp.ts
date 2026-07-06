// Minimal typings + helpers for the Telegram WebApp SDK.
// Docs: https://core.telegram.org/bots/webapps

export type TgUser = {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  photo_url?: string;
};

type TgWebApp = {
  initData: string;
  initDataUnsafe: {
    user?: TgUser;
    query_id?: string;
    auth_date?: number;
    hash?: string;
  };
  ready: () => void;
  expand: () => void;
  colorScheme?: "light" | "dark";
  themeParams?: Record<string, string>;
};

declare global {
  interface Window {
    Telegram?: { WebApp?: TgWebApp };
  }
}

/** Return the Telegram WebApp instance if available. */
export function getTelegramWebApp(): TgWebApp | null {
  if (typeof window === "undefined") return null;
  return window.Telegram?.WebApp ?? null;
}

/**
 * Get the current Telegram user (if the site is opened inside Telegram as a
 * Web App / Mini App). Returns null when opened in a normal browser.
 */
export function getTelegramUser(): TgUser | null {
  const wa = getTelegramWebApp();
  if (!wa) return null;
  // initDataUnsafe is only populated when Telegram actually launched the page
  return wa.initDataUnsafe?.user ?? null;
}

/** Build a display name from Telegram user object. */
export function tgUserDisplayName(u: TgUser): string {
  const parts = [u.first_name, u.last_name].filter(Boolean);
  const full = parts.join(" ").trim();
  return full || u.username || `User ${u.id}`;
}

/** Signal the Telegram client that the WebApp is ready to be displayed. */
export function initTelegram(): TgUser | null {
  const wa = getTelegramWebApp();
  if (!wa) return null;
  try {
    wa.ready();
    wa.expand();
  } catch {
    /* noop */
  }
  return wa.initDataUnsafe?.user ?? null;
}
