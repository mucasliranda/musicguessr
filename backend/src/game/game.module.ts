import { PrismaService } from 'src/database/prisma.service';
import { GameController } from './controllers/game.controller';
import { GameRepository } from './repositories/game-repository';
import { PrismaGameRepository } from './repositories/prisma/prisma-game-repository';
import { PrismaRoundRepository } from './repositories/prisma/prisma-round-repository';
import { RoundRepository } from './repositories/round-repository';
import { GameService } from './services/game.service';
import { Module } from '@nestjs/common';
import { SpotifyService } from 'src/spotify/services/spotify.service';
import { SpotifyRepository } from 'src/spotify/repositories/spotify-repository';
import { ApiSpotifyRepository } from 'src/spotify/repositories/api/api-spotify-repository';

@Module({
  imports: [],
  controllers: [GameController],
  providers: [
    GameService,
    SpotifyService,
    PrismaService,
    {
      provide: SpotifyRepository,
      useClass: ApiSpotifyRepository,
    }, {
      provide: GameRepository,
      useClass: PrismaGameRepository,
    }, {
      provide: RoundRepository,
      useClass: PrismaRoundRepository,
    }
  ],
})
export class GameModule {}
