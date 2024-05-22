import { Injectable } from "@nestjs/common";
import { CreateGameDto } from "../dtos/create-game.dto";
import { Song } from "src/shared/model";
import { AddSongsDto } from "../dtos/add-songs.dto";
import { InMemoryGameRepository } from "../repository/InMemoryGameRepository";
import { SongsRepository } from "src/songs/repository/songsRepository";



@Injectable()
export class GameService {
  constructor(
    private readonly gameRepository: InMemoryGameRepository,
    private readonly songsRepository: SongsRepository,
  ) {}

  public async subscribe(fn: any, gameId: string) {
    const game = await this.gameRepository.getGame(gameId);

    game.subscribe(fn);
  }

  public async createGame({ gameId, albums }: CreateGameDto) {
    const promises = [];

    Object.entries(albums).forEach(([albumId, songsId]) => {
      if (songsId.length > 0) {
        promises.push(this.songsRepository.getSeveralSongsByIds(songsId))
      } else {
        promises.push(this.songsRepository.getSongsByAlbum(albumId));
      }
    });

    // const songs = (await Promise.all(promises)).map((a) => console.log({a}));

    const songs = (await Promise.all(promises))
      .reduce((acc, val) => {
        acc.push(...val.data);
        return acc;
      }, []) as Song[]

    await this.gameRepository.createGame(gameId, songs);
  }

  public async addSongs({ songs, gameId }: AddSongsDto) {
    const game = await this.gameRepository.getGame(gameId);

    game.addSongs(songs);
  }

  public async addPlayer({ playerId, gameId }) {
    const game = await this.gameRepository.getGame(gameId);

    game.addPlayer({ playerId });
  }

  public async removePlayer({ playerId, gameId }) {
    const game = await this.gameRepository.getGame(gameId);

    game.removePlayer({ playerId });
  }

  public async startGame({ gameId }) {
    const game = await this.gameRepository.getGame(gameId);

    game.startGame();
  }

  public async onNextRound({ gameId }) {
    const game = await this.gameRepository.getGame(gameId);

    game.onNextRound();
  }

  public async guessSong({ playerId, songGuessed, timePassed, gameId }: { playerId: string, songGuessed: Song, timePassed?: number, gameId: string}) {
    const game = await this.gameRepository.getGame(gameId);

    game.guessSong({ playerId, songGuessed, timePassed });
  }

  public async timedOut({ playerId, gameId }) {
    const game = await this.gameRepository.getGame(gameId);

    game.timedOut({ playerId });
  }

  public async getSongs({ gameId }) {
    const game = await this.gameRepository.getGame(gameId);

    return game.getSongs();
  }

  public async getPlayers({ gameId }) {
    const game = await this.gameRepository.getGame(gameId);

    return game.getPlayers();
  }
}