import { Module } from '@nestjs/common';
import { GameModule } from './game/game.module';
import { ConfigModule } from '@nestjs/config'
import config from './config/env'
import { SongsModule } from './songs/songs.module';
import { CheckModule } from './check/check.module';

@Module({
  imports: [
    CheckModule,
    SongsModule,
    GameModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config]
    }),
  ],
})
export class AppModule {}
