import { Injectable } from "@nestjs/common";
import { Song } from "src/shared/model";
import { AddSongsDto } from "../dtos/add-songs.dto";
import { InMemoryGameRepository } from "../repository/InMemoryGameRepository";
import { SongsRepository } from "src/songs/repository/songsRepository";
import { CreateGameByAlbumsDto } from "../dtos/create-game-by-albums.dto";
import { CreateGameBySongs } from "../dtos/create-game-by-songs.dto";



@Injectable()
export class GameService {
  constructor(
    private readonly gameRepository: InMemoryGameRepository,
    private readonly songsRepository: SongsRepository,
  ) {}

  public async hasGame(gameId: string) {
    return await this.gameRepository.hasGame(gameId);
  }

  public async subscribe(fn: any, gameId: string) {
    const game = await this.gameRepository.getGame(gameId);

    game.subscribe(fn);
  }

  public async createGameByAlbums({ gameId, albums }: CreateGameByAlbumsDto) {
    const promises = [] as Promise<any>[];

    Object.entries(albums ?? {}).forEach(([albumId, songsId]) => {
      if (songsId.length > 0) {
        promises.push(this.songsRepository.getSeveralSongsByIds(songsId))
      } else {
        promises.push(this.songsRepository.getSongsByAlbum(albumId));
      }
    });

    const songs = await (await Promise.all(promises))
      .reduce((acc, val) => {
        acc.push(...val.data);
        return acc;
      }, []) as Song[];

    return await this.gameRepository.createGame(gameId, songs);
  }

  public async createGameBySongs({ gameId, songs }: CreateGameBySongs) {
    return await this.gameRepository.createGame(gameId, songs);
  }

  public async addSongs({ songs, gameId }: AddSongsDto) {
    const game = await this.gameRepository.getGame(gameId);

    game.addSongs(songs);
  }

  public async addPlayer({ id, gameId, name }) {
    const game = await this.gameRepository.getGame(gameId);

    game.addPlayer({ id, name });
  }

  public async removePlayer({ playerId, gameId }) {
    const hasGame = await this.gameRepository.hasGame(gameId);

    if (hasGame) {
      const game = await this.gameRepository.getGame(gameId);
  
      game.removePlayer({ playerId });
    }
  }

  public async startGame({ gameId }) {
    const game = await this.gameRepository.getGame(gameId);

    game.startGame();
  }

  public async onNextRound({ gameId }) {
    const game = await this.gameRepository.getGame(gameId);

    game.onNextRound();
  }

  public async guessSong({ playerId, songGuessed, gameId, guessedAt }: { playerId: string, songGuessed: Song, gameId: string, guessedAt: number }) {
    const game = await this.gameRepository.getGame(gameId);

    game.guessSong({ playerId, songGuessed, guessedAt });
  }

  public async timedOut({ playerId, gameId }) {
    const game = await this.gameRepository.getGame(gameId);

    game.timedOut({ playerId });
  }

  public async setGameConfig({ gameId, roundDuration, songDuration, gameMode, value }) {
    const game = await this.gameRepository.getGame(gameId);

    game.setGameConfig({ roundDuration, songDuration, gameMode, value });
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