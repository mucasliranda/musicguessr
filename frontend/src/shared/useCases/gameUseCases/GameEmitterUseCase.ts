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

  emitGameConfig({ roundDuration, songDuration, gameMode, value }: { roundDuration: number, songDuration: number, gameMode: string, value: number }) {
    this.socketServer.emit('gameConfig', { roundDuration, songDuration, gameMode, value });
  }
}