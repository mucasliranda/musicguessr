import { Injectable } from "@nestjs/common";
import { CacheRepository } from "../repository/cacheRespository";



@Injectable()
export class CacheService {
  constructor(
    private readonly cacheRepository: CacheRepository,
  ) {}

  async get<T>(key: string): Promise<T | null> {
    return this.cacheRepository.get(key) as T | null;
  } 

  async getMany<T>(cacheKey: string, values: string[]) {
    return this.cacheRepository.getMany<T>(cacheKey, values);
  }

  async set(key: string, value: any) {
    return this.cacheRepository.set(key, value);
  }

  async setMany(cacheKey: string, values: {key: string, value: any}[]) {
    return this.cacheRepository.setMany(cacheKey, values);
  }
}