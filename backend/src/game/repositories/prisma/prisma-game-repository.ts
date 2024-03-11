import { PrismaService } from "src/database/prisma.service";



export class PrismaGameRepository implements GameRepository {
  constructor(private prisma: PrismaService) {}

  async create(gameId: string, artistId: string): Promise<void> {
    await this.prisma.game.create({
      data: {
        id: gameId,
        artist: artistId,
      }
    });
  }
}