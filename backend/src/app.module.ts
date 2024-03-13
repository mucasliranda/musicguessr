import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SpotifyModule } from './spotify/spotify.module';
import { PrismaService } from './database/prisma.service';
import { GameModule } from './game/game.module';
import { ConfigModule } from '@nestjs/config'
import config from './config/env'

@Module({
  imports: [
    SpotifyModule,
    GameModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config]
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
