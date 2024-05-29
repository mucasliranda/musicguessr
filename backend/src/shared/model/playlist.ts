import { PlaylistSong } from "./song";
import { Image } from "./image";

export interface Playlist {
  id: string;
  name: string;
  image: Image | null;
}

export interface FullPlaylist {
  id: string;
  name: string;
  image: Image | null;
  songs: Array<PlaylistSong>;
}