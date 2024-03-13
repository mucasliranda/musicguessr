import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { GameService } from '../services/game.service';
import { CreateGameDto } from '../dtos/create-game.dto';
import { SpotifyService } from 'src/spotify/services/spotify.service';

class GoNextRoundDto {
  gameId: string;
  round?: string;
}

@Controller()
export class GameController {
  constructor(
    private readonly gameService: GameService,
    private readonly spotifyService: SpotifyService,
  ) {}

  @Post('/game/start')
  async startGame(@Body() createGameDto: CreateGameDto) {
    await this.gameService.createGame(createGameDto);
  }

  @Get('/game/highlight')
  // async getMusicHighlight(@Body() goNextRoundDto: GoNextRoundDto) {
  async getMusicHighlight(@Query() goNextRoundDto: GoNextRoundDto) {
    const game = await this.gameService.getGame(goNextRoundDto.gameId);

    const track = await this.spotifyService.getSomeTrackByArtist(game.artist);

    const highlight = await this.spotifyService.getSomeTrackHighlight(track.id);

    await this.gameService.createRound({
      gameId: game.id,
      musicId: track.id,
      music: track.name,
      startAt: highlight,
      number: !!goNextRoundDto.round ? parseInt(goNextRoundDto.round) : 1,
    });

    return {
      startAt: highlight,
    }
  }
}