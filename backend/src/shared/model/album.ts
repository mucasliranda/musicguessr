import { Song } from "./song";

export interface Album {
  id: string;
  name: string;
  image: string;
}

export interface FullAlbum {
  id: string;
  name: string;
  image: string;
  artists: Array<string>; 
  songs: Array<Song>;
}