import { Song } from "src/shared/model";



export interface CreateGameBySongs {
  gameId: string;

  songs: Array<Song>;
}