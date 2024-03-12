


export abstract class SpotifyRepository {
  abstract getTrackAudioAnalysis(trackId: string): Promise<any>;
  abstract getTopTracksByArtist(artistId: string): Promise<any>;
  abstract getArtistsBySearch(search: string): Promise<any>;
  abstract getAccessToken(): Promise<string>
}