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

  emitGuessSong(song: Song) {
    this.socketServer.emit('guessSong', song);
  }

  emitTimedOut() {
    this.socketServer.emit('timedOut');
  }
}