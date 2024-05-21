import { io, Socket } from 'socket.io-client';
import { SocketRepository, SocketResponse } from './repositories/SocketRepository';


export class SocketSingleton {
  static socket: SocketClient;

  private constructor() { }

  public static getSocket(): SocketClient {
    if (!SocketSingleton.socket) {
      SocketSingleton.socket = new SocketClient();
    }

    return SocketSingleton.socket;
  }
}

class SocketClient
  implements SocketRepository {
  private socket: Socket = io('http://localhost:3005', { autoConnect: false });

  constructor() { }

  emit<T>(event: string, data: T | undefined = undefined) {
    this.socket.emit(event, data);
  }

  on<T>(event: string, callback: (response: SocketResponse<T>) => void) {
    this.socket.on(event, callback);
  }

  off<T>(event: string, callback: (data: T) => void) {
    this.socket.off(event, callback);
  }

  removeAllListeners(event: string) {
    this.socket.removeAllListeners(event);
  }

  connect({ username, gameId }: { username: string, gameId: string}) {
    this.socket.auth = { gameId, username };
    this.socket.connect();
  }

  disconnect() {
    this.socket.disconnect();
  }
}