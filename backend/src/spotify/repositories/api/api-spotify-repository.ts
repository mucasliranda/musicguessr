import { Injectable } from "@nestjs/common";
import { SpotifyRepository } from "../spotify-repository";
import { ConfigService } from "@nestjs/config";



function getRightImage(images: any[] | null) {
  // preciso pegar a imagem que tem a menor diferença entre a largura e a altura
  // e que seja maior ou igual que a largura desejada
  const desiredWidth = 300; // Substitua isso pela largura desejada
  let selectedImage = images[0];

  images.forEach((img) => {
    if (img.width >= desiredWidth && img.height >= desiredWidth) {
      if (selectedImage.width > img.width && selectedImage.height > img.height) {
        selectedImage = img;
      }
    }
  });

  return selectedImage?.url
}

@Injectable()
export class ApiSpotifyRepository implements SpotifyRepository {
  constructor(
    private configService: ConfigService,
  ) {}
  private accessToken: string | null;
  private clientId: string = this.configService.get<string>('SPOTIFY_CLIENT_ID');
  private clientSecret: string = this.configService.get<string>('SPOTIFY_CLIENT_SECRET');
  private tokenObtainedAt: number;

  async getArtistAlbums(artistId: string) {
    await this.ensureAccessToken();

    const _fetch = await fetch(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`
      }
    });

    const res = await _fetch.json();

    return {
      status: _fetch.status,
      data: res.items.map((album) => {
        return {
          id: album.id,
          name: album.name,
          image: getRightImage(album.images),
        }
      })
    }
  }

  async getSongsByAlbum(albumId: string) {
    await this.ensureAccessToken();

    const _fetch = await fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks`, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`
      },
    });

    const res = await _fetch.json();

    return {
      status: _fetch.status,
      data: res.items.map((song) => {
        return {
          id: song.id,
          name: song.name,
          url: song.preview_url,
          playable: !!song.preview_url,
        } 
      })
    }
  }

  async getAlbum(albumId: string) {
    await this.ensureAccessToken();

    const _fetch = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`
      },
    });

    const res = await _fetch.json();

    return {
      status: _fetch.status,
      data: {
        id: res.id,
        name: res.name,
        image: getRightImage(res.images),
        artists: res.artists.map(({name}) => name),
        songs: res.tracks.items.map((song) => {
          return {
            id: song.id,
            name: song.name,
            url: song.preview_url,
            playable: !!song.preview_url,
          } 
        }),
      }
    }
  }

  async getArtistsBySearch(search: string) {
    await this.ensureAccessToken();

    const _fetch = await fetch(`https://api.spotify.com/v1/search?q=${search}&type=artist&limit=20`, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`
      }
    });

    const res = await _fetch.json();

    return {
      status: _fetch.status,
      data: res.artists.items.map((artist) => {
        return {
          id: artist.id,
          name: artist.name,
          image: getRightImage(artist.images),
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

    const res = await _fetch.json();

    this.accessToken = res.access_token;
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







  // async getTrackPreview(trackId: string): Promise<string> {
  //   await this.ensureAccessToken();

  //   const _fetch = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
  //     headers: {
  //       'Authorization': `Bearer ${this.accessToken}`
  //     }
  //   });

  //   const res = await _fetch.json();

  //   return res.preview_url
  // }

  // async getTrackHighlights(trackId: string, by: 'segments' | 'sections' = 'segments'): Promise<Array<number>> {
  //   await this.ensureAccessToken();

  //   const _fetch = await fetch(`https://api.spotify.com/v1/audio-analysis/${trackId}`, {
  //     headers: {
  //       'Authorization': `Bearer ${this.accessToken}`
  //     }
  //   });

  //   const res = await _fetch.json();

  //   const highlights = res[by].map((segment) => {
  //     // seconds to milliseconds
  //     return segment.start * 1000
  //   });

  //   return highlights as number[]
  // }

  // async getTopTracksByArtist(artistId: string): Promise<Array<{id: string, name: string}>> {
  //   await this.ensureAccessToken();

  //   const _fetch = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=BR`, {
  //     headers: {
  //       'Authorization': `Bearer ${this.accessToken}`
  //     }
  //   });

  //   const res = await _fetch.json();

  //   return res.tracks.map((track) => {
  //     return {
  //       id: track.id,
  //       name: track.name,
  //     }
  //   });
  // };
}
