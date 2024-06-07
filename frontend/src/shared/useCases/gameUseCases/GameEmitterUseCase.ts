import { Song } from "src/shared/model";
import { SocketRepository } from "src/shared/repositories/SocketRepository";



export class GameEmitterUseCase {
  private socketServer: SocketRepository;

  constructor(socketServer: SocketRepository) {
    this.socketServer = socketServer;
  }

  emitStartGame() {
    this.socketServer.emit('startGame');
  }

  emitGuessSong({ songGuessed, guessedAt }: { songGuessed: Song, guessedAt: number}) {
    this.socketServer.emit('guessSong', { songGuessed, guessedAt });
  }

  emitTimedOut() {
    this.socketServer.emit('timedOut');
  }

  emitJoinGame({ gameId, username }: { gameId: string, username: string }) {
    this.socketServer.emit('joinGame', { gameId, username });
  }

  emitGameConfig({ speed, duration }: { speed: string, duration: string }) {
    this.socketServer.emit('gameConfig', { speed, duration });
  }
}