import { Song } from 'src/shared/model';



export interface AddSongsDto {
  songs: Array<Song>;
  gameId: string;
}