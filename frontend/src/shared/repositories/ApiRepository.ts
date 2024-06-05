import { Album, Artist, FullAlbum, Playlist } from "../model";

export abstract class ApiRepository {
  abstract getArtists(search: string): Promise<Array<Artist>>;
  abstract getFullSearch(search: string): Promise<{artists: Array<Artist>, playlists: Array<Playlist>}>;
  abstract getAlbumsByArtistId(artistId: string | undefined): Promise<Array<Album>> ;
  abstract getFullAlbum(albumId: string | undefined): Promise<FullAlbum>;
  
  abstract getPlaylistsByCategory(categoryId: string): Promise<Array<Playlist>>;

  abstract createGameByAlbums({ gameId, albums }): Promise<void>;
  abstract createGameBySongs({ gameId, songs }): Promise<void>;
}
