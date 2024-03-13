import { Game } from "@prisma/client";

export abstract class GameRepository {
  abstract create({
    id,
    artist,
  }: Game): Promise<void>;

  abstract getGame(gameId: string): Promise<Game>;
}