
import { Module } from '@nestjs/common';
import { SongsController } from './controllers/songs.controller';
import { SongsService } from './services/songs.service';
import { SongsRepository } from './repository/songsRepository';
import { SpotifySongsRepository } from './repository/spotifySongsRepository';

@Module({
  imports: [],
  controllers: [SongsController],
  providers: [SongsService, {
    provide: SongsRepository,
    useClass: SpotifySongsRepository,
  }],
})
export class SongsModule {}
