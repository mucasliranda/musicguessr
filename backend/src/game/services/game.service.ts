import { Injectable } from "@nestjs/common";
import Game from "../entities/game";
import { CreateGameDto } from "../dtos/create-game.dto";
import { SpotifyService } from "src/spotify/services/spotify.service";
import { Song } from "src/shared/model";
import { AddSongsDto } from "../dtos/add-songs.dto";
import { InMemoryGameRepository } from "../repository/InMemoryGameRepository";

let _game: Game;

@Injectable()
export class GameService {
  constructor(
    private readonly spotifyService: SpotifyService,
    private readonly gameRepository: InMemoryGameRepository
  ) {}

  // private game: Game;

  // public debug() {
  //   this.game.debug();
  // }

  public subscribe(fn) {
    const game = this.gameRepository.getGame('');

    game.subscribe(fn);
  }

  public createGame({ gameId }: CreateGameDto) { 
    const game = this.gameRepository.createGame(gameId);
  }

  public addSongs({ songs }: AddSongsDto) {
    const game = this.gameRepository.getGame('');

    game.addSongs(songs);
  }

  public addPlayer({ playerId }) {
    const game = this.gameRepository.getGame('');

    game.addPlayer({ playerId });
  }

  public removePlayer({ playerId }) {
    const game = this.gameRepository.getGame('');

    game.removePlayer({ playerId });
  }

  public startGame() {
    const game = this.gameRepository.getGame('');

    game.startGame();
  }

  public onNextRound() {
    const game = this.gameRepository.getGame('');

    game.onNextRound();
  }

  public guessSong({ playerId, songGuessed, timePassed }: { playerId: string, songGuessed: Song, timePassed?: number }) {
    const game = this.gameRepository.getGame('');

    game.guessSong({ playerId, songGuessed, timePassed });
  }

  public timedOut({ playerId }) {
    const game = this.gameRepository.getGame('');

    game.timedOut({ playerId });
  }

  public getSongs() {
    const game = this.gameRepository.getGame('');

    return game.getSongs();
  }

  public getPlayers() {
    const game = this.gameRepository.getGame('');

    return game.getPlayers();
  }
}