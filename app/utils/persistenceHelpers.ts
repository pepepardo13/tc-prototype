/**
 * Simplified persistence helpers for standalone Storybook.
 * Removes @envato/cookiebot-wrapper dependency.
 */

export const enum Consent {
  necessary = 1,
  preferences = 2,
  statistics = 3,
  marketing = 4,
}

type CookieOptions = {
  name: string;
  value: string;
  consent: Consent;
  tld?: boolean;
  expires: number;
};

function setCookie(
  name: string,
  value: string,
  tld: boolean,
  expires: number,
): void {
  if (typeof window === "undefined") {
    return;
  }

  let domain = "";
  if (tld) {
    const hostname = window.location.hostname;
    const domainParts = hostname.split(".");
    const tldDomain =
      domainParts.length >= 2 ? domainParts.slice(-2).join(".") : hostname;
    domain = `domain=.${tldDomain};`;
  }

  const maxAge = expires * 24 * 60 * 60;
  document.cookie = `${name}=${value}; ${domain}path=/; max-age=${maxAge}; secure; samesite=strict`;
}

export function deferOrSetCookie(options: CookieOptions): void {
  const { name, value, tld = false, expires } = options;
  setCookie(name, value, tld, expires);
}

export const CookieConsent = {
  necessary: Consent.necessary,
  preferences: Consent.preferences,
  statistics: Consent.statistics,
  marketing: Consent.marketing,
} as const;

export function parseCookies(
  cookieHeader: string | null,
): Record<string, string> {
  if (!cookieHeader) return {};

  const cookies: Record<string, string> = {};

  cookieHeader.split(";").forEach((cookie) => {
    const [name, value] = cookie.trim().split("=");
    if (name && value) {
      cookies[name] = decodeURIComponent(value);
    }
  });

  return cookies;
}
