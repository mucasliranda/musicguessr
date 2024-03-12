import { Round } from "@prisma/client";

export abstract class RoundRepository {
  abstract create({
    gameId,
    musicId,
    music,
  }: Omit<Round, "tries" | "finished">): Promise<Round>;
}