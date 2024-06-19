import { Module } from "@nestjs/common";
import { CacheRepository } from "./repository/cacheRespository";
import { UpstashCacheRepository } from "./repository/upstashCacheRepository";
import { CacheService } from "./services/cache.service";
import { RedisCacheRepository } from "./repository/redisCacheRepository";



@Module({
  imports: [],
  controllers: [],
  providers: [
    CacheService,
    {
      provide: CacheRepository,
      useClass: UpstashCacheRepository,
    }
  ],
})
export class CacheModule {}