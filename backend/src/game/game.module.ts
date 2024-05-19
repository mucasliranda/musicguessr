import { PrismaService } from 'src/database/prisma.service';
import { GameController } from './controllers/game.controller';
import { Module } from '@nestjs/common';
import { GameGateway } from './gateway/game.gateway';
import { GameService } from './services/game.service';
import { InMemoryGameRepository } from './repository/InMemoryGameRepository';

@Module({
  imports: [],
  controllers: [GameController],
  providers: [
    GameService,
    PrismaService,
    GameGateway,
    InMemoryGameRepository,
  ],
})
export class GameModule {}
