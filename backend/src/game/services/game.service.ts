import { Injectable } from "@nestjs/common";
import { GameRepository } from "../repositories/game-repository";

@Injectable()
export class GameService {
  constructor(
    private gameRepository: GameRepository,
  ) {}

  async createGame(gameId: string, artistId: string) {
    const gameCreated = await this.gameRepository.create({
      id: gameId,
      artist: artistId,
    });
  }
}