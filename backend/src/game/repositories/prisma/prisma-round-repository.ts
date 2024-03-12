import { PrismaService } from "src/database/prisma.service";
import { randomUUID } from 'node:crypto'
import { RoundRepository } from "../round-repository";
import { Round } from "@prisma/client";



export class PrismaRoundRepository implements RoundRepository {
  constructor(private prisma: PrismaService) {}

  async create({ 
    gameId,
    musicId,
    music,
  }: Round): Promise<Round> {
    const round = await this.prisma.round.create({
      data: {
        musicId: musicId,
        id: randomUUID(),
        finished: false,
        music: music,
        tries: 0,
        game: {
          connect: {
            id: gameId
          }
        }
      }
    });

    return round;
  }
}