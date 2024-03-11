import { SpotifyController } from './controllers/spotify.controller';
import { SpotifyService } from './services/spotify.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [SpotifyController],
  providers: [SpotifyService],
})
export class SpotifyModule {}
