


export abstract class SpotifyRepository {
  abstract getArtistAlbums(artistId: string): Promise<Array<{id: string, name: string, image: string}>>;
  abstract getTrackHighlights(trackId: string, by: 'segments' | 'sections'): Promise<Array<number>>;
  abstract getTrackPreview(trackId: string): Promise<string>;
  abstract getTopTracksByArtist(artistId: string): Promise<Array<{id: string, name: string}>>;
  abstract getArtistsBySearch(search: string): Promise<any>;
  abstract getAccessToken(): Promise<string>
}