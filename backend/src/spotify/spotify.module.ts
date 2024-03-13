import { SpotifyController } from './controllers/spotify.controller';
import { SpotifyService } from './services/spotify.service';
import { SpotifyRepository } from './repositories/spotify-repository';
import { Module } from '@nestjs/common';
import { ApiSpotifyRepository } from './repositories/api/api-spotify-repository';

@Module({
  imports: [],
  controllers: [SpotifyController],
  providers: [SpotifyService, {
    provide: SpotifyRepository,
    useClass: ApiSpotifyRepository,
  }],
})
export class SpotifyModule {}
