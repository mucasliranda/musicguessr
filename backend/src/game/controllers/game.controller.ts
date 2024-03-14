import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { GameService } from '../services/game.service';
import { CreateGameDto } from '../dtos/create-game.dto';
import { SpotifyService } from 'src/spotify/services/spotify.service';

class GetTrackDto {
  gameId: string;
  round: string;
}

@Controller()
export class GameController {
  constructor(
    private readonly gameService: GameService,
    private readonly spotifyService: SpotifyService,
  ) {}

  @Post('/game/start')
  async startGame(@Body() createGameDto: CreateGameDto) {
    console.log({...createGameDto, where: 'game.controller'})
    await this.gameService.createGame(createGameDto);
  }

  @Get('/game/track')
  async getTrack(@Query() getTrackDto: GetTrackDto) {
    const game = await this.gameService.getGame(getTrackDto.gameId);

    const { id: trackId, name: trackName } = await this.spotifyService.getSomeTrackByArtist(game.artist);

    const track = await this.spotifyService.getTrackPreview(trackId);

    

    // preciso sortear um numero de 0 a 25 (segundos) e multiplicar por 1000 para obter o valor em milissegundos
    const startAt = Math.floor(Math.random() * 25) * 1000;

    await this.gameService.createRound({
      gameId: game.id,
      musicId: trackId,
      music: trackName,
      startAt: startAt,
      number: Number(getTrackDto.round),
    });

    return {
      startAt: startAt,
      track: track,
    }
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