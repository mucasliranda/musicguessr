import { Song } from ".";

export abstract class Album {
  id: string;
  name: string;
  image: string;
}

export abstract class FullAlbum {
  id: string;
  name: string;
  image: string;
  artists: Array<string>;
  songs: Song[];
}