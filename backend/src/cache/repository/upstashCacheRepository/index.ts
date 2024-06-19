import { Redis } from "@upstash/redis";
import { CacheRepository } from "../cacheRespository";
import { ConfigService } from "@nestjs/config";



export class UpstashCacheRepository implements CacheRepository {
  private redis: Redis | null;
  private defaultTtl = 8 * 60 * 60 * 1000; // 8 horas

  configService = new ConfigService();

  constructor() {
    try {
      this.redis = new Redis({
        url: 'https://loved-gar-34315.upstash.io',
        token: this.configService.get('UPSTASH_TOKEN'),
      });
    }
    catch (err) {
      this.redis = null;
    }
  }

  public async get<T>(key: string): Promise<T | null> {
    if (!this.redis) {
      return null;
    }
    return await this.redis.get(key) as T | null;
  }

  public async getMany<T>(cacheKey: string, values: string[]) {
    if (!this.redis) {
      return [];
    }
    return (await this.redis.mget(values.map((value) => `${cacheKey}-${value}`))).filter((_) => _ !== null) as T[];
  }

  public async set(key: string, value: any) {
    if (!this.redis) {
      return;
    }
    await this.redis.set(key, JSON.stringify(value), {ex: this.defaultTtl});
  }

  public async setMany(cacheKey: string, values: {key: string, value: any}[]) {
    if (!this.redis) {
      return;
    }
    // @ts-ignore
    await Promise.all(values.map(({key, value}) => this.redis.set(`${cacheKey}-${key}`, JSON.stringify(value), {ex: this.defaultTtl})));
  }
}