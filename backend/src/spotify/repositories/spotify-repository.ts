


export abstract class SpotifyRepository {
  abstract getTrackHighlights(trackId: string, by: 'segments' | 'sections'): Promise<Array<number>>;
  abstract getTopTracksByArtist(artistId: string): Promise<Array<{id: string, name: string}>>;
  abstract getArtistsBySearch(search: string): Promise<any>;
  abstract getAccessToken(): Promise<string>
}