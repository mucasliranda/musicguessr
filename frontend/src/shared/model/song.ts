export interface Song {
  id: string;
  name: string;
  url: string;
  playable?: boolean;
  artists: Array<string>;
}

export interface PlaylistSong {
  id: string;
  name: string;
  url: string;
  playable?: boolean;
  image: string;
  artists: Array<string>;
}