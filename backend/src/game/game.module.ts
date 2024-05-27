import { PrismaService } from 'src/database/prisma.service';
import { GameController } from './controllers/game.controller';
import { Module } from '@nestjs/common';
import { GameGateway } from './gateway/game.gateway';
import { GameService } from './services/game.service';
import { InMemoryGameRepository } from './repository/InMemoryGameRepository';
import { SongsRepository } from 'src/songs/repository/songsRepository';
import { SpotifySongsRepository } from 'src/songs/repository/spotifySongsRepository';
import { CacheService } from 'src/cache/cacheService';

@Module({
  imports: [],
  controllers: [GameController],
  providers: [
    GameService,
    PrismaService,
    GameGateway,
    InMemoryGameRepository,
    CacheService,
    {
      provide: SongsRepository,
      useClass: SpotifySongsRepository,
    },
  ],
})
export class GameModule {}
