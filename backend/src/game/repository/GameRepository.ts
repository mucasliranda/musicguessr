import Game from "../entities/game";



export abstract class GameRepository {
  abstract getGame(gameId: string): Game;
  abstract createGame(gameId: string): Game;
}