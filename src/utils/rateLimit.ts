// Simple client-side rate limiting to prevent abuse
// This is a basic protection - for production, implement server-side rate limiting

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

interface RequestLog {
  count: number;
  resetTime: number;
}

const STORAGE_KEY = 'cover_letter_rate_limit';

export class RateLimiter {
  private config: RateLimitConfig;

  constructor(config: RateLimitConfig) {
    this.config = config;
  }

  private getRequestLog(): RequestLog {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return { count: 0, resetTime: Date.now() + this.config.windowMs };
    }

    try {
      return JSON.parse(stored);
    } catch {
      return { count: 0, resetTime: Date.now() + this.config.windowMs };
    }
  }

  private saveRequestLog(log: RequestLog): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(log));
  }

  checkLimit(): { allowed: boolean; resetIn?: number; remaining?: number } {
    const log = this.getRequestLog();
    const now = Date.now();

    // Reset if window has passed
    if (now >= log.resetTime) {
      const newLog: RequestLog = {
        count: 0,
        resetTime: now + this.config.windowMs,
      };
      this.saveRequestLog(newLog);
      return { allowed: true, remaining: this.config.maxRequests };
    }

    // Check if limit exceeded
    if (log.count >= this.config.maxRequests) {
      const resetIn = Math.ceil((log.resetTime - now) / 1000 / 60); // minutes
      return { allowed: false, resetIn };
    }

    return { 
      allowed: true, 
      remaining: this.config.maxRequests - log.count 
    };
  }

  recordRequest(): void {
    const log = this.getRequestLog();
    const now = Date.now();

    // Reset if window has passed
    if (now >= log.resetTime) {
      this.saveRequestLog({
        count: 1,
        resetTime: now + this.config.windowMs,
      });
    } else {
      // Increment count
      log.count += 1;
      this.saveRequestLog(log);
    }
  }

  getRemainingRequests(): number {
    const log = this.getRequestLog();
    const now = Date.now();

    if (now >= log.resetTime) {
      return this.config.maxRequests;
    }

    return Math.max(0, this.config.maxRequests - log.count);
  }

  getResetTime(): number {
    const log = this.getRequestLog();
    return log.resetTime;
  }

  reset(): void {
    localStorage.removeItem(STORAGE_KEY);
  }
}

// Default rate limiter: 5 requests per hour
export const coverLetterRateLimiter = new RateLimiter({
  maxRequests: 5,
  windowMs: 60 * 60 * 1000, // 1 hour
});
