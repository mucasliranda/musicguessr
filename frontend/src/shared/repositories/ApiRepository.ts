import { Album, Artist, FullAlbum, Playlist } from "../model";

export abstract class ApiRepository {
  abstract getArtists(search: string): Promise<Array<Artist>>;
  abstract getAlbumsByArtistId(artistId: string | undefined): Promise<Array<Album>> ;
  abstract getFullAlbum(albumId: string | undefined): Promise<FullAlbum>;
  
  abstract getPlaylistsByCategory(categoryId: string): Promise<Array<Playlist>>;

  abstract createGame({ gameId, albums }): Promise<void>;
}
