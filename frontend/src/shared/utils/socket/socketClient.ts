import { io, Socket } from 'socket.io-client';

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

class SocketClient {
  private socket: Socket = io('http://localhost:3005');

  constructor() { }

  emit<T>(event: string, data: T | undefined = undefined) {
    this.socket.emit(event, data);
  }

  on<T>(event: string, callback: (data: T) => void) {
    this.socket.on(event, callback);
  }

  off<T>(event: string, callback: (data: T) => void) {
    this.socket.off(event, callback);
  }

  connect() {
    this.socket.connect();
  }

  disconnect() {
    this.socket.disconnect();
  }
}