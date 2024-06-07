import { SocketRepository } from "src/shared/repositories/SocketRepository";



export class GameListenersUseCase {
  private socketServer: SocketRepository;
  private onChangePlayersCallback?;
  private onGameStartCallback?;
  private onNewRoundCallback?;
  private onEndRoundCallback?;
  private onConnectedCallback?;
  private onGameNotFoundCallback?;

  constructor(socketServer: SocketRepository) {
    this.socketServer = socketServer;
  }

  setOnChangePlayersCallback(callback: (data: any) => void) {
    this.onChangePlayersCallback = callback;
    this.socketServer.removeAllListeners('players');
    this.socketServer.on('players', this.onChangePlayersCallback);
  }

  setOnGameStartCallback(callback: (data: any) => void) {
    this.onGameStartCallback = callback;
    this.socketServer.removeAllListeners('startGame');
    this.socketServer.on('startGame', this.onGameStartCallback);
  }

  setOnNewRoundCallback(callback: (data: any) => void) {
    this.onNewRoundCallback = callback;
    this.socketServer.removeAllListeners('newRound');
    this.socketServer.on('newRound', this.onNewRoundCallback);
  }

  setOnEndRoundCallback(callback: (data: any) => void) {
    this.onEndRoundCallback = callback;
    this.socketServer.removeAllListeners('endRound');
    this.socketServer.on('endRound', this.onEndRoundCallback);
  }

  setOnGameJoinedCallback(callback: (data: any) => void) {
    this.onConnectedCallback = callback;
    this.socketServer.removeAllListeners('gameJoined');
    this.socketServer.on('gameJoined', this.onConnectedCallback);
  }

  setOnGameNotFoundCallback(callback: (data: any) => void) {
    this.onGameNotFoundCallback = callback;
    this.socketServer.removeAllListeners('gameNotFound');
    this.socketServer.on('gameNotFound', this.onGameNotFoundCallback);
  }

  offAllListeners() {
    this.socketServer.disconnect();
    this.socketServer.removeAllListeners('players');
    this.socketServer.removeAllListeners('startGame');
    this.socketServer.removeAllListeners('newRound');
    this.socketServer.removeAllListeners('endRound');
    this.socketServer.removeAllListeners('gameJoined');
    this.socketServer.removeAllListeners('gameNotFound');
  }
}