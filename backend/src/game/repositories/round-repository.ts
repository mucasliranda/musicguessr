import { CreateRoundDto } from "../dtos/create-round.dto";

export abstract class RoundRepository {
  abstract create({
    gameId,
    musicId,
    music,
    startAt,
    number,
  }: CreateRoundDto): Promise<void>;
}