import { Body, Controller, Post, Put } from '@nestjs/common';
import { GameService } from '../services/game.service';
import { AddSongsDto } from '../dtos/add-songs.dto';
import { CreateGameByAlbumsDto } from '../dtos/create-game-by-albums.dto';
import { CreateGameBySongs } from '../dtos/create-game-by-songs.dto';



@Controller('game')
export class GameController {
  constructor(
    private readonly gameService: GameService,
  ) {}

  @Post('/albums')
  async createGameByAlbums(@Body() createGameDto: CreateGameByAlbumsDto) {
    return await this.gameService.createGameByAlbums(createGameDto);
  }

  @Post('/songs')
  async createGameBySongs(@Body() createGameDto: CreateGameBySongs) {
    return await this.gameService.createGameBySongs(createGameDto);
  }

  @Put() 
  async addSongs(@Body() addSongsDto: AddSongsDto) {
    return this.gameService.addSongs(addSongsDto);
  }
}