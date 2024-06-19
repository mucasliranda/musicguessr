import { Module } from '@nestjs/common';
import { SongsController } from './controllers/songs.controller';
import { SongsService } from './services/songs.service';
import { SongsRepository } from './repository/songsRepository';
import { SpotifySongsRepository } from './repository/spotifySongsRepository';
import { CacheService } from 'src/cache/services/cache.service';
import { CacheRepository } from 'src/cache/repository/cacheRespository';
import { UpstashCacheRepository } from 'src/cache/repository/upstashCacheRepository';

@Module({
  imports: [],
  controllers: [SongsController],
  providers: [
    SongsService, 
    CacheService,
    {
      provide: SongsRepository,
      useClass: SpotifySongsRepository,
    },
    {
      provide: CacheRepository,
      useClass: UpstashCacheRepository,
    }
  ],
})
export class SongsModule {}
