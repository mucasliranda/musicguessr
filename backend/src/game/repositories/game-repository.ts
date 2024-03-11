abstract class GameRepository {
  abstract create(gameId: string, artistId: string): Promise<void>;
}