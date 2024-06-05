import { Injectable } from '@nestjs/common';
import { Redis } from '@upstash/redis'



@Injectable()
export class CacheService {
  private redis: Redis;
  private defaultTtl = 8 * 60 * 60 * 1000; // 8 horas

  constructor() {
    this.redis = new Redis({
      url: 'https://loved-gar-34315.upstash.io',
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
  }

  public async get<T>(key: string): Promise<T | null> {
    const value = await this.redis.get(key) as T | null;
    return value ? value : null;
  }

  public async getMany<T>(cacheKey: string, values: string[]) {
    return (await this.redis.mget(values.map((value) => `${cacheKey}-${value}`))).filter((_) => _ !== null) as T[];
  }

  public async set(key: string, value: any, ttl: number | undefined = this.defaultTtl) {
    return await this.redis.set(key, JSON.stringify(value), {ex: ttl});
  }

  public async setMany(cacheKey: string, values: {key: string, value: any}[], ttl: number | undefined = this.defaultTtl) {
    return await Promise.all(values.map(({key, value}) => this.redis.set(`${cacheKey}-${key}`, JSON.stringify(value), {ex: ttl})));
  }
}