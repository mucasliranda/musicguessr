


export interface SocketRepository {
  emit: (event: string, ...args: any[]) => void;
  on<T>(event: string, callback: (response: SocketResponse<T>) => void);
  off<T>(event: string, callback: (data: T) => void);
  removeAllListeners: (event: string) => void;
  connect: ({ username, gameId }: { username: string, gameId: string}) => void;
  disconnect: () => void;
}

export interface SocketResponse<T> {
  event: string;
  data: T;
}
