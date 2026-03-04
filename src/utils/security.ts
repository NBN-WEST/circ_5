/**
 * Funzioni di sicurezza per l'applicazione
 */

export const CSP_DIRECTIVES = {
  defaultSrc: ["'self'"],
  scriptSrc: ["'self'", "'unsafe-inline'"],
  styleSrc: ["'self'", "'unsafe-inline'"],
  imgSrc: ["'self'", "data:", "https:"],
  connectSrc: [
    "'self'",
    "https://api.anthropic.com",
    "https://tonejs.github.io"
  ],
  fontSrc: ["'self'"],
  objectSrc: ["'none'"],
  mediaSrc: ["'self'", "https://tonejs.github.io"],
  frameSrc: ["'none'"]
};

export function generateCSPHeader(): string {
  return Object.entries(CSP_DIRECTIVES)
    .map(([key, values]) => {
      const directive = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      return `${directive} ${values.join(' ')}`;
    })
    .join('; ');
}

export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>'"]/g, '')
    .slice(0, 1000);
}

export function validateApiKey(key: string): boolean {
  const pattern = /^sk-ant-[a-zA-Z0-9\-_]{20,}$/;
  return pattern.test(key);
}

class RateLimiter {
  private requests: number[] = [];
  private limit: number;
  private windowMs: number;

  constructor(limit: number = 10, windowMs: number = 60000) {
    this.limit = limit;
    this.windowMs = windowMs;
  }

  canMakeRequest(): boolean {
    const now = Date.now();
    this.requests = this.requests.filter(time => now - time < this.windowMs);

    if (this.requests.length >= this.limit) {
      return false;
    }

    this.requests.push(now);
    return true;
  }

  getRemainingRequests(): number {
    const now = Date.now();
    this.requests = this.requests.filter(time => now - time < this.windowMs);
    return Math.max(0, this.limit - this.requests.length);
  }
}

export const apiRateLimiter = new RateLimiter(10, 60000);
