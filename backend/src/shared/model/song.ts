export interface Song {
  id: string;
  name: string;
  url: string;
  playable?: boolean;
}

export interface PlaylistSong {
  id: string;
  name: string;
  url: string;
  playable?: boolean;
  image: string;
  artist: Array<string>;
}