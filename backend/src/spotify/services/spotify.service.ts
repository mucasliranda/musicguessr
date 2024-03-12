import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class SpotifyService {
  constructor(
    private configService: ConfigService,
  ) {}
  private accessToken: string | null;
  private clientId: string = this.configService.get<string>('SPOTIFY_CLIENT_ID');
  private clientSecret: string = this.configService.get<string>('SPOTIFY_CLIENT_SECRET');
  private tokenObtainedAt: number;

  async getTrackAudioAnalysis(trackId: string) {
    await this.ensureAccessToken();

    const _fetch = await fetch(`https://api.spotify.com/v1/audio-analysis/${trackId}`, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`
      }
    });
  }

  async getTopTracksByArtist(artistId: string): Promise<{status: number, tracks: Array<string>}> {
    await this.ensureAccessToken();

    const _fetch = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=BR`, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`
      }
    });

    const response = await _fetch.json();

    return {
      status: _fetch.status,
      tracks: response.tracks.map((track) => {
        return track.id
      })
    };
  };

  async getArtistsBySearch(search: string): Promise<any> {
    await this.ensureAccessToken();

    const _fetch = await fetch(`https://api.spotify.com/v1/search?q=${search}&type=artist&limit=20`, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`
      }
    });

    const response = await _fetch.json();

    return {
      status: _fetch.status,
      artists:  response.artists.items.map((artist) => {
        return {
          id: artist.id,
          name: artist.name,
          images: artist.images,
        }
      })
    }
  }

  async getAccessToken() {
    const _fetch = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: this.clientId,
        client_secret: this.clientSecret
      })
    });

    const response = await _fetch.json();

    this.accessToken = response.access_token;
    this.tokenObtainedAt = Date.now();

    return this.accessToken;
  }

  private async ensureAccessToken() {
    if (!this.accessToken || this.isTokenExpired()) {
      await this.getAccessToken();
    }
  }

  private isTokenExpired() {
    const oneHour = 3600 * 1000; // 3600 seconds in milliseconds
    return (Date.now() - this.tokenObtainedAt) >= oneHour;
  }
};