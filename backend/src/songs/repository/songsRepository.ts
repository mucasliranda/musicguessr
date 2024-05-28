import { Album, Artist, FullAlbum, FullPlaylist, Playlist, Song } from "../../shared/model";



export interface SongsRepositoryResponse<T> {
  status: number;
  data: T;
}

export abstract class SongsRepository {
  abstract getPlaylist(playlistId: string): Promise<SongsRepositoryResponse<FullPlaylist>>;
  abstract getPlaylistsByCategory(categoryId: string): Promise<SongsRepositoryResponse<Array<Playlist>>>;



  abstract getArtistAlbums(search: string): Promise<SongsRepositoryResponse<Array<Album>>>;
  abstract getSongsByAlbum(albumId: string): Promise<SongsRepositoryResponse<Array<Song>>>;
  abstract getSongById(songId: string): Promise<SongsRepositoryResponse<Song>>;
  abstract getSeveralSongsByIds(songsId: string[]): Promise<SongsRepositoryResponse<Array<Song>>>;
  abstract getFullAlbum(albumId: string): Promise<SongsRepositoryResponse<FullAlbum>>;
  abstract getArtistsBySearch(search: string): Promise<SongsRepositoryResponse<Array<Artist>>>;
  
  abstract getAccessToken(): Promise<string>
}