import { SocketRepository } from "src/shared/repositories/SocketRepository";



export class GameListenersUseCase {
  private socketServer: SocketRepository;
  private onPlayerChangeCallback?;
  private onGameStartCallback?;
  private onNewRoundCallback?;
  private onEndRoundCallback?;

  constructor(socketServer: SocketRepository) {
    this.socketServer = socketServer;
  }

  setOnPlayerChangeCallback(callback: (data: any) => void) {
    this.onPlayerChangeCallback = callback;
    this.socketServer.removeAllListeners('players');
    this.socketServer.on('players', this.onPlayerChangeCallback);
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
}



// useEffect(() => {
//   if (gameId) {
//     const socket = SocketSingleton.getSocket();

//     socket.connect({ gameId, username });

//     socket.on('players', onChangePlayers)
//     // socket.on('players', (a) => {
//     //   console.log({a})
//     // })

//     socket.on('startGame', onReceiveStartGame)

//     socket.on('newRound', onNewRound)

//     socket.on('endRound', onEndRound)

//     socket.on('guess', onChangePlayers)

//     return () => {
//       socket.disconnect();
//       socket.off('players', onChangePlayers);
//       socket.off('startGame', onReceiveStartGame);
//       socket.off('newRound', onNewRound);
//       socket.off('endRound', onEndRound);
//       socket.off('guess', onChangePlayers);
//     }
//   }
// }, [gameId]);