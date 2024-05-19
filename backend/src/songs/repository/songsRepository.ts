import { Album, Artist, FullAlbum, Song } from "../../shared/model";



export interface SongsRepositoryResponse<T> {
  status: number;
  data: T;
}

export abstract class SongsRepository {
  abstract getArtistAlbums(search: string): Promise<SongsRepositoryResponse<Array<Album>>>;
  abstract getSongsByAlbum(albumId: string): Promise<SongsRepositoryResponse<Array<Song>>>;
  abstract getAlbum(albumId: string): Promise<SongsRepositoryResponse<FullAlbum>>;
  abstract getArtistsBySearch(search: string): Promise<SongsRepositoryResponse<Array<Artist>>>;
  
  abstract getAccessToken(): Promise<string>
}