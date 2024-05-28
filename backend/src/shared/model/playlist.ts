import { PlaylistSong, Song } from "./song";

export interface Playlist {
  id: string;
  name: string;
  image: string;
}

export interface FullPlaylist {
  id: string;
  name: string;
  image: string;
  songs: Array<PlaylistSong>;
}