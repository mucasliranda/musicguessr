import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SpotifyModule } from './spotify/spotify.module';
import { ConfigModule } from '@nestjs/config'
import config from './config/env'
import { PrismaService } from './database/prisma.service';

@Module({
  imports: [
    SpotifyModule,
    PrismaService,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config]
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
