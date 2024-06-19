import { Song } from "src/shared/model";
import Game from "../entities/game";



export abstract class GameRepository {
  abstract getGame(gameId: string): Promise<Game>;
  abstract createGame(gameId: string, songs?: Song[]): Promise<Game>;
  abstract hasGame(gameId: string): Promise<boolean>;
}