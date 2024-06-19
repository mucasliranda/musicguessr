import { io, Socket } from 'socket.io-client';
import { SocketRepository, SocketResponse } from '../SocketRepository';


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
  private socket: Socket = io(import.meta.env.VITE_API_URL, { autoConnect: true });

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

  disconnect() {
    this.socket.disconnect();
  }
}