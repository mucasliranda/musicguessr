import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameModule } from './game/game.module';
import { ConfigModule } from '@nestjs/config'
import config from './config/env'
import { SongsModule } from './songs/songs.module';

@Module({
  imports: [
    SongsModule,
    GameModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config]
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
