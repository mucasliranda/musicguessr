import { PrismaService } from "src/database/prisma.service";
import { GameRepository } from "../game-repository";
import { Game } from "@prisma/client";



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
}