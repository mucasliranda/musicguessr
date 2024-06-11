import { GameController } from './controllers/game.controller';
import { Module } from '@nestjs/common';
import { GameGateway } from './gateway/game.gateway';
import { GameService } from './services/game.service';
import { InMemoryGameRepository } from './repository/InMemoryGameRepository';
import { SongsRepository } from 'src/songs/repository/songsRepository';
import { SpotifySongsRepository } from 'src/songs/repository/spotifySongsRepository';
import { CacheService } from 'src/cache/services/cache.service';
import { CacheRepository } from 'src/cache/repository/cacheRespository';
import { UpstashCacheRepository } from 'src/cache/repository/upstashCacheRepository';

@Module({
  imports: [],
  controllers: [GameController],
  providers: [
    GameService,
    GameGateway,
    InMemoryGameRepository,
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
export class GameModule {}
