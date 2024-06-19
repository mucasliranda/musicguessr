


export interface CreateGameByAlbumsDto {
  gameId: string;

  albums: {[key: string]: string[]};
}