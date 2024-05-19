import { Injectable } from "@nestjs/common";
import Game from "../entities/game";
import { CreateGameDto } from "../dtos/create-game.dto";
import { Song } from "src/shared/model";
import { AddSongsDto } from "../dtos/add-songs.dto";
import { InMemoryGameRepository } from "../repository/InMemoryGameRepository";



@Injectable()
export class GameService {
  constructor(
    private readonly gameRepository: InMemoryGameRepository
  ) {}

  public async subscribe(fn: any, gameId: string) {
    const game = await this.gameRepository.getGame(gameId);

    game.subscribe(fn);
  }

  public async createGame({ gameId }: CreateGameDto) { 
    await this.gameRepository.createGame(gameId);
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