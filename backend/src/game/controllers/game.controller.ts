import { Body, Controller, Post, Put } from '@nestjs/common';
import { GameService } from '../services/game.service';
import { CreateGameDto } from '../dtos/create-game.dto';
import { AddSongsDto } from '../dtos/add-songs.dto';



@Controller('game')
export class GameController {
  constructor(
    private readonly gameService: GameService,
  ) {}

  @Post()
  async createGame(@Body() createGameDto: CreateGameDto) {
    console.log('dentro do controller', createGameDto)

    this.gameService.createGame(createGameDto);
  }

  @Put() 
  async addSongs(@Body() addSongsDto: AddSongsDto) {
    this.gameService.addSongs(addSongsDto);
  }
}