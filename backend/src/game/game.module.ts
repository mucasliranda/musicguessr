import { GameController } from './controllers/game.controller';
import { GameService } from './services/game.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule {}
