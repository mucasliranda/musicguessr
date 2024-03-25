import { Injectable } from "@nestjs/common";
import Game from "../entities/game";
import { CreateGameDto } from "../dtos/create-game.dto";
import { SpotifyService } from "src/spotify/services/spotify.service";
import { Song } from "src/shared/model";

let _game: Game;

@Injectable()
export class GameService {
  constructor(
    private readonly spotifyService: SpotifyService,
  ) {}

  private game: Game;

  private setGame(game: Game) {
    this.game = game;
    _game = this.game;
  }

  public debug() {
    this.game.debug();
  }

  public subscribe(fn) {
    this.game.subscribe(fn);
  }

  public async createGame({ gameId, albums }: CreateGameDto) {
    const songsReturn = await Promise.all(albums.map(album => this.spotifyService.getSongsByAlbum(album)));

    const songs = songsReturn.flatMap(({ data }) => data);
    
    // this.game = new Game(gameId, songs as any[]);
    this.setGame(new Game(gameId, songs as any[]));
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