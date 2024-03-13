import { Injectable } from "@nestjs/common";
import { GameRepository } from "../repositories/game-repository";
import { CreateGameDto } from "../dtos/create-game.dto";
import { RoundRepository } from "../repositories/round-repository";
import { CreateRoundDto } from "../dtos/create-round.dto";
import { Game } from "@prisma/client";

@Injectable()
export class GameService {
  constructor(
    private gameRepository: GameRepository,
    private roundRepository: RoundRepository,
  ) {}

  async createGame({gameId, artistId}: CreateGameDto): Promise<void> {
    await this.gameRepository.create({
      id: gameId,
      artist: artistId,
    });
  }

  async getGame(gameId: string): Promise<Game> {
    return this.gameRepository.getGame(gameId);
  }

  async createRound({gameId, musicId, music, number, startAt}: CreateRoundDto): Promise<void> {
    await this.roundRepository.create({
      gameId,
      musicId,
      music,
      number,
      startAt,
    });
  }
}