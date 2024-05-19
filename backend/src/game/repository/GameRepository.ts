import Game from "../entities/game";



export abstract class GameRepository {
  abstract getGame(gameId: string): Promise<Game>;
  abstract createGame(gameId: string): Promise<Game>;
}