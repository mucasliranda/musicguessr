import { Album, Artist, Song } from "../../shared/model";



export interface ApiSpotifyResponse<T> {
  status: number;
  data: T;
}

export abstract class SpotifyRepository {
  abstract getArtistAlbums(search: string): Promise<ApiSpotifyResponse<Array<Album>>>;
  abstract getSongsByAlbum(albumId: string): Promise<ApiSpotifyResponse<Array<Song>>>;
  abstract getArtistsBySearch(search: string): Promise<ApiSpotifyResponse<Array<Artist>>>;
  abstract getAccessToken(): Promise<string>




  /*                BAGULHOS ANTIGOS                  */

  // abstract getTrackHighlights(trackId: string, by: 'segments' | 'sections'): Promise<Array<number>>;
  // abstract getTrackPreview(trackId: string): Promise<string>;
  // abstract getTopTracksByArtist(artistId: string): Promise<Array<{id: string, name: string}>>;
}