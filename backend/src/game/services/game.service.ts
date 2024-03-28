import { Injectable } from "@nestjs/common";
import Game from "../entities/game";
import { CreateGameDto } from "../dtos/create-game.dto";
import { SpotifyService } from "src/spotify/services/spotify.service";
import { Song } from "src/shared/model";
import { AddSongsDto } from "../dtos/add-songs.dto";

let _game: Game;

@Injectable()
export class GameService {
  constructor(
    private readonly spotifyService: SpotifyService,
  ) {}

  private game: Game;

  public debug() {
    this.game.debug();
  }

  public subscribe(fn) {
    this.game.subscribe(fn);
  }

  public createGame({ gameId }: CreateGameDto) { 
    this.game = new Game(gameId);
  }

  public addSongs({ songs }: AddSongsDto) {
    this.game.addSongs(songs);
  }

  public addPlayer({ playerId }) {
    this.game.addPlayer({ playerId });
  }

  public removePlayer({ playerId }) {
    this.game.removePlayer({ playerId });
  }

  public startGame() {
    this.game.startGame();
  }

  public onNextRound() {
    this.game.onNextRound();
  }

  public guessSong({ playerId, songGuessed, timePassed }: { playerId: string, songGuessed: Song, timePassed?: number }) {
    this.game.guessSong({ playerId, songGuessed, timePassed });
  }

  public timedOut({ playerId }) {
    this.game.timedOut({ playerId });
  }

  public getSongs() {
    return this.game.getSongs();
  }

  public getPlayers() {
    return this.game.getPlayers();
  }
}