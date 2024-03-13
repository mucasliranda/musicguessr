import { PrismaService } from "src/database/prisma.service";
import { GameRepository } from "../game-repository";
import { Game } from "@prisma/client";
import { Injectable } from "@nestjs/common";



@Injectable()
export class PrismaGameRepository implements GameRepository {
  constructor(private prisma: PrismaService) {}

  async create({
    id,
    artist,
  }: Game): Promise<void> {
    await this.prisma.game.create({
      data: {
        id: id,
        artist: artist,
      }
    });
  }

  async getGame(gameId: string): Promise<Game> {
    return this.prisma.game.findUnique({
      where: {
        id: gameId
      }
    });
  }
}