import { PrismaService } from "src/database/prisma.service";
import { randomUUID } from 'node:crypto'
import { RoundRepository } from "../round-repository";
import { Round } from "@prisma/client";
import { Injectable } from "@nestjs/common";



@Injectable()
export class PrismaRoundRepository implements RoundRepository {
  constructor(private prisma: PrismaService) {}

  async create({ 
    gameId,
    musicId,
    music,
    startAt,
    number,
  }: Round): Promise<void> {
    await this.prisma.round.create({
      data: {
        musicId: musicId,
        id: randomUUID(),
        finished: false,
        music: music,
        startAt: startAt,
        number: number,
        tries: 0,
        game: {
          connect: {
            id: gameId
          }
        }
      }
    });
  }
}