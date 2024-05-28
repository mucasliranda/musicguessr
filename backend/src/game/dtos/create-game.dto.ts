


export interface CreateGameDto {
  gameId: string;

  albums: {[key: string]: string[]} | undefined;

  songsId: string[] | undefined;
}