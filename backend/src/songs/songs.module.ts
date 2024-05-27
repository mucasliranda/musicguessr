
import { Module } from '@nestjs/common';
import { SongsController } from './controllers/songs.controller';
import { SongsService } from './services/songs.service';
import { SongsRepository } from './repository/songsRepository';
import { SpotifySongsRepository } from './repository/spotifySongsRepository';
import { CacheService } from 'src/cache/cacheService';

@Module({
  imports: [],
  controllers: [SongsController],
  providers: [
    SongsService, 
    CacheService,
    {
      provide: SongsRepository,
      useClass: SpotifySongsRepository,
    }
  ],
})
export class SongsModule {}
