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
    this.gameService.createGame(createGameDto);
  }

  @Put() 
  async addSongs(@Body() addSongsDto: AddSongsDto) {
    this.gameService.addSongs(addSongsDto);
  }





  // DEPRECATED
  // @Get('/game/highlight')
  // async getMusicHighlight(@Query() goNextRoundDto: GoNextRoundDto) {
  //   const game = await this.gameService.getGame(goNextRoundDto.gameId);

  //   const track = await this.spotifyService.getSomeTrackByArtist(game.artist);

  //   const highlight = await this.spotifyService.getSomeTrackHighlight(track.id);

  //   await this.gameService.createRound({
  //     gameId: game.id,
  //     musicId: track.id,
  //     music: track.name,
  //     startAt: highlight,
  //     number: !!goNextRoundDto.round ? parseInt(goNextRoundDto.round) : 1,
  //   });

  //   return {
  //     startAt: highlight,
  //   }
  // }
}