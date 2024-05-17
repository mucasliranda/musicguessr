import { io, Socket } from 'socket.io-client';

class SocketSingleton {
  private static socket: Socket;

  private constructor() { }

  public static getSocket(): Socket {
    if (!SocketSingleton.socket) {
      SocketSingleton.socket = io('http://localhost:3005');
    }

    return SocketSingleton.socket;
  }
}

export default SocketSingleton;