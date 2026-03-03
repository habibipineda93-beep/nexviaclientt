// Client-side URL shortener with NEXV branding
// Generates deterministic short codes based on URL hash

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function generateCode(url: string): string {
  const hash = hashCode(url + Date.now().toString());
  let code = "";
  let n = hash;
  for (let i = 0; i < 6; i++) {
    code += CHARS[n % CHARS.length];
    n = Math.floor(n / CHARS.length) + i;
  }
  return code;
}

export interface ShortenedUrl {
  original: string;
  short: string;
  code: string;
  createdAt: string;
}

const STORAGE_KEY = "nexv_shortened_urls";

export function getStoredUrls(): ShortenedUrl[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function shortenUrl(originalUrl: string): ShortenedUrl {
  const stored = getStoredUrls();
  const existing = stored.find((u) => u.original === originalUrl);
  if (existing) return existing;

  const code = generateCode(originalUrl);
  const entry: ShortenedUrl = {
    original: originalUrl,
    short: `nexv.co/${code}`,
    code,
    createdAt: new Date().toISOString(),
  };
  stored.unshift(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stored.slice(0, 100)));
  return entry;
}
