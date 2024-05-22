import { Injectable } from "@nestjs/common";
import Game from "../entities/game";
import { GameRepository } from "./GameRepository";
import { Song } from "src/shared/model";


@Injectable()
export class InMemoryGameRepository 
  implements GameRepository {
  private games: Map<string, Game>;

  constructor() {
    this.games = new Map();
  }

  async getGame(gameId: string): Promise<Game> {
    const game = this.games.get(gameId);
    if (!game) {
      throw new Error(`GAME_NOT_FOUND: ${gameId}`);
    }
    return game;
  }

  async createGame(gameId: string, songs: Song[] = []): Promise<Game> {
    const game = new Game(gameId, songs);
    this.games.set(gameId, game);
    console.log(game)
    return game;
  }
}