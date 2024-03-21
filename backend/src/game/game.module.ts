import { PrismaService } from 'src/database/prisma.service';
import { GameController } from './controllers/game.controller';
import { Module } from '@nestjs/common';
import { SpotifyService } from 'src/spotify/services/spotify.service';
import { SpotifyRepository } from 'src/spotify/repositories/spotify-repository';
import { ApiSpotifyRepository } from 'src/spotify/repositories/api/api-spotify-repository';
import { GameGateway } from './gateway/game.gateway';
import { GameService } from './services/game.service';

@Module({
  imports: [],
  controllers: [GameController],
  providers: [
    GameService,
    SpotifyService,
    PrismaService,
    GameGateway,
    {
      provide: SpotifyRepository,
      useClass: ApiSpotifyRepository,
    }
  ],
})
export class GameModule {}
