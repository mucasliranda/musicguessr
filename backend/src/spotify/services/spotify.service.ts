import { Injectable } from "@nestjs/common";
import { SpotifyRepository } from "../repositories/spotify-repository";

@Injectable()
export class SpotifyService {
  constructor(
    private readonly spotifyRepository: SpotifyRepository,
  ) {}

  async getArtistsBySearch(search: string): Promise<any> {
    return this.spotifyRepository.getArtistsBySearch(search);
  }

  async getTrackPreview(trackId: string) {
    return this.spotifyRepository.getTrackPreview(trackId);
  }

  async getSomeTrackHighlight(trackId: string, by: 'segments' | 'sections' = 'segments') {
    const highlights = await this.spotifyRepository.getTrackHighlights(trackId, by);

    return highlights[Math.floor(Math.random() * highlights.length)];
  }

  async getSomeTrackByArtist(artistId: string) {
    const tracks = await this.spotifyRepository.getTopTracksByArtist(artistId);

    return tracks[Math.floor(Math.random() * tracks.length)];
  }
};