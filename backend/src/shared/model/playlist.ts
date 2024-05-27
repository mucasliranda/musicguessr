import { Song } from "./song";

export interface Playlist {
  id: string;
  name: string;
  image: string;
  songs: Array<Song>;
}