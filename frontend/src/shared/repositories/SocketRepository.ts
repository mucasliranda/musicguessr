


export abstract class SocketRepository {
  abstract emit: (event: string, ...args: any[]) => void;
  abstract on<T>(event: string, callback: (response: SocketResponse<T>) => void);
  abstract off<T>(event: string, callback: (data: T) => void);
  abstract removeAllListeners: (event: string) => void;
  abstract connect: ({ username, gameId }: { username: string, gameId: string}) => void;
  abstract disconnect: () => void;
}

export interface SocketResponse<T> {
  event: string;
  data: T;
}
