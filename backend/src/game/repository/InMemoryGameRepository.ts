import { Injectable, NotFoundException } from "@nestjs/common";
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
      throw new NotFoundException(`Game with id ${gameId} not found`);
    }

    return game;
  }

  async hasGame(gameId: string): Promise<boolean> {
    return this.games.has(gameId);
  }

  async createGame(gameId: string, songs: Song[] = []): Promise<Game> {
    const game = new Game(gameId, songs);
    this.games.set(gameId, game);
    return game;
  }
}