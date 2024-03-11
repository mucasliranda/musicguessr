import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "src/database/prisma.service";

@Injectable()
export class GameService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async create(gameId: string, artistId: string) {
    const gameCreated = await this.prisma.game.create({
      data: {
        id: gameId,
        artist: artistId,
      }
    });
  }
}