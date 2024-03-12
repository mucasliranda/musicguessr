import { Body, Controller, Get, Post } from '@nestjs/common';
import { GameService } from '../services/game.service';
import { CreateGameDto } from '../dtos/create-game.dto';
import { SpotifyService } from 'src/spotify/services/spotify.service';

@Controller()
export class GameController {
  constructor(
    private readonly gameService: GameService,
    private readonly spotifyService: SpotifyService,
  ) {}

  @Post()
  async initGame(@Body() createGameDto: CreateGameDto) {
    await this.gameService.createGame(createGameDto);
  }

  @Get()
  async goToNextRound() {
    
  }
}