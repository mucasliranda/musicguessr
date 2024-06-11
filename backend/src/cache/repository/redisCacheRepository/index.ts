import { createClient, RedisClientType } from 'redis';
import { CacheRepository } from '../cacheRespository';
import { ConfigService } from '@nestjs/config';



export class RedisCacheRepository implements CacheRepository {
  private redis: RedisClientType | null;
  private defaultTtl = 8 * 60 * 60 * 1000; // 8 horas

  configService = new ConfigService();

  constructor() {
    this.redis = createClient({
      url: this.configService.get('REDIS_URL'),
    });

    this.redis.connect().then().catch(() => {
      console.log('Redis connection failed, running without cache')
      this.redis = null
    });
  }

  public async get<T>(key: string): Promise<T | null> {
    if (!this.redis) {
      return null;
    }
    const value = await this.redis.get(key) as string | null;
  
    return value !== null ? JSON.parse(value) : null;
  }

  public async getMany<T>(cacheKey: string, values: string[]) {
    if (!this.redis) {
      return [];
    }

    const result = await Promise.all(values.map(async (value) => {
      // @ts-ignore
      const cacheValue = await this.redis.get(`${cacheKey}-${value}`) as string | null;
  
      return cacheValue !== null ? JSON.parse(cacheValue) : null;
    }));

    return result;
  }

  public async set(key: string, value: any) {
    if (this.redis) {
      await this.redis.set(key, JSON.stringify(value), { EX: this.defaultTtl });
    }
  }

  public async setMany(cacheKey: string, values: {key: string, value: any}[]) {
    if (this.redis) {
      // @ts-ignore
      await Promise.all(values.map(({key, value}) => this.redis.set(`${cacheKey}-${key}`, JSON.stringify(value), {EX: this.defaultTtl})));
    }
  }
}