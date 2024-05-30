import { Song } from "./song";
import { Image } from "./image";

export interface Album {
  id: string;
  name: string;
  image: Image | null;
}

export interface FullAlbum {
  id: string;
  name: string;
  image: Image | null;
  artists: Array<string>; 
  songs: Array<Song>;
}