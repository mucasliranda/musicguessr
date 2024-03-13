import { PrismaService } from 'src/database/prisma.service';
import { GameController } from './controllers/game.controller';
import { GameRepository } from './repositories/game-repository';
import { PrismaGameRepository } from './repositories/prisma/prisma-game-repository';
import { PrismaRoundRepository } from './repositories/prisma/prisma-round-repository';
import { RoundRepository } from './repositories/round-repository';
import { GameService } from './services/game.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [GameController],
  providers: [
    GameService,
    PrismaService,
    {
      provide: GameRepository,
      useClass: PrismaGameRepository,
    }, {
      provide: RoundRepository,
      useClass: PrismaRoundRepository,
    }
  ],
})
export class GameModule {}
