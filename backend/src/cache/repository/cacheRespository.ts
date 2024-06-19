


export abstract class CacheRepository {
  abstract get<T>(key: string): Promise<T | null>;
  abstract getMany<T>(cacheKey: string, values: string[]): Promise<T[]>;
  abstract set(key: string, value: any): Promise<void>;
  abstract setMany(cacheKey: string, values: {key: string, value: any}[]): Promise<void>; 
}