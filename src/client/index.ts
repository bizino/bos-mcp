import axios, { AxiosInstance, AxiosError } from 'axios';
import { BosMcpConfig, mergeConfig } from '../config';

class TokenBucket {
  private tokens: number;
  private lastRefill: number;
  private readonly maxTokens: number;
  private readonly refillRate: number;

  constructor(maxTokens: number, refillPerSecond: number) {
    this.maxTokens = maxTokens;
    this.tokens = maxTokens;
    this.lastRefill = Date.now();
    this.refillRate = refillPerSecond;
  }

  async acquire(count: number = 1): Promise<boolean> {
    this.refill();
    if (this.tokens >= count) {
      this.tokens -= count;
      return true;
    }
    return false;
  }

  private refill(): void {
    const now = Date.now();
    const elapsed = (now - this.lastRefill) / 1000;
    this.tokens = Math.min(this.maxTokens, this.tokens + elapsed * this.refillRate);
    this.lastRefill = now;
  }
}

const rateLimiter = new TokenBucket(60, 1);
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

export class BosApiClient {
  private client: AxiosInstance;

  constructor(config?: Partial<BosMcpConfig>) {
    const cfg = mergeConfig(config);
    this.client = axios.create({
      baseURL: cfg.bosApiUrl,
      timeout: cfg.timeout,
      headers: {
        'Content-Type': 'application/json',
        ...(cfg.bosApiToken && { 'Authorization': `Bearer ${cfg.bosApiToken}` }),
      },
    });
  }

  async request<T>(method: string, path: string, data?: any): Promise<T> {
    while (!(await rateLimiter.acquire())) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    let lastError: Error | null = null;
    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      try {
        const response = await this.client.request<T>({
          method,
          url: path,
          ...(data && { data }),
        });
        return response.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status >= 400 && error.response?.status < 500 && error.response?.status !== 429) {
            throw error;
          }
          lastError = error;
          if (attempt < MAX_RETRIES - 1) {
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * (attempt + 1)));
          }
        } else {
          throw error;
        }
      }
    }
    throw lastError || new Error('Request failed after retries');
  }

  async get<T>(path: string): Promise<T> {
    return this.request<T>('GET', path);
  }

  async post<T>(path: string, data?: any): Promise<T> {
    return this.request<T>('POST', path, data);
  }

  async put<T>(path: string, data?: any): Promise<T> {
    return this.request<T>('PUT', path, data);
  }

  async delete<T>(path: string): Promise<T> {
    return this.request<T>('DELETE', path);
  }
}

export const bosApi = new BosApiClient();
