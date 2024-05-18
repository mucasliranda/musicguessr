import { Injectable } from "@nestjs/common";
import Game from "../entities/game";
import { GameRepository } from "./GameRepository";


@Injectable()
export class InMemoryGameRepository 
  implements GameRepository {
  private games: Map<string, Game>;

  private game: Game;

  constructor() {
    this.games = new Map();
  }

  getGame(gameId: string): Game {
    // const game = this.games.get(gameId);
    // if (!game) {
    //   throw new Error(`GAME_NOT_FOUND: ${gameId}`);
    // }
    // return game;
    return this.game
  }

  createGame(gameId: string): Game {
    // const game = new Game(gameId);
    // this.games.set(gameId, game);
    // return game;
    this.game = new Game(gameId);

    return this.game
  }
}