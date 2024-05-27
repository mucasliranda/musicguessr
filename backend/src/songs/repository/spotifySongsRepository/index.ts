import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { SongsRepository } from "../songsRepository";
import { CacheService } from "src/cache/cacheService";
import { Album, Artist, FullAlbum, Song } from "src/shared/model";



function getBestFitImage(images: any[] | null) {
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
export class SpotifySongsRepository implements SongsRepository {
  constructor(
    private configService: ConfigService,
    private cacheService: CacheService,
  ) {}
  private accessToken: string | null;
  private clientId: string = this.configService.get<string>('SPOTIFY_CLIENT_ID');
  private clientSecret: string = this.configService.get<string>('SPOTIFY_CLIENT_SECRET');
  private tokenObtainedAt: number;

  async getPlaylist(playlistId: string) {
    await this.ensureAccessToken();

    const _fetch = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`
      }
    });

    const res = await _fetch.json();

    return {
      status: _fetch.status,
      data: {
        id: res.id,
        name: res.name,
        image: getBestFitImage(res.images),
        songs: res.tracks.items.map((song) => {
          return {
            id: song.track.id,
            name: song.track.name,
            url: song.track.preview_url,
            playable: !!song.track.preview_url,
          }
        })
      }
    }
  }


  async getArtistAlbums(artistId: string) {
    const cacheKey = `artist-albums-${artistId}`;
    const cache = await this.cacheService.get<Array<Album>>(cacheKey);

    if (cache) {
      return {
        status: 200,
        data: cache,
      }
    }

    await this.ensureAccessToken();

    const _fetch = await fetch(`https://api.spotify.com/v1/artists/${artistId}/albums?limit=50`, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`
      }
    });

    let res = await _fetch.json();
    let albums = res.items;

    while (res.next) {
      const _fetch = await fetch(res.next, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`
        }
      });

      res = await _fetch.json();
      albums = [...albums, ...res.items];
    }

    const data = albums.map((album) => {
      return {
        id: album.id,
        name: album.name,
        image: getBestFitImage(album.images),
      }
    }) as Array<Album>

    await this.cacheService.set(cacheKey, data);

    return {
      status: _fetch.status,
      data: data
    }
  }

  async getSongsByAlbum(albumId: string) {
    const cacheKey = `songs-${albumId}`;
    const cache = await this.cacheService.get<Array<Song>>(cacheKey);

    if (cache) {
      return {
        status: 200,
        data: cache,
      }
    }

    await this.ensureAccessToken();

    const _fetch = await fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks`, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`
      },
    });

    const res = await _fetch.json();
    const data = res.items.map((song) => {
      return {
        id: song.id,
        name: song.name,
        url: song.preview_url,
        playable: !!song.preview_url,
      } 
    }) as Array<Song>

    await this.cacheService.set(cacheKey, data);

    return {
      status: _fetch.status,
      data: data
    }
  }

  async getSongById(songId: string) {
    const cacheKey = `song-${songId}`;
    const cache = await this.cacheService.get<Song>(cacheKey);

    if (cache) {
      return {
        status: 200,
        data: cache,
      }
    }

    await this.ensureAccessToken();

    const _fetch = await fetch(`https://api.spotify.com/v1/tracks/${songId}`, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`
      },
    });

    const res = await _fetch.json();
    const data = {
      id: res.id,
      name: res.name,
      url: res.preview_url,
      playable: !!res.preview_url,
    } as Song

    await this.cacheService.set(cacheKey, data);

    return {
      status: _fetch.status,
      data: data
    }
  }

  async getSeveralSongsByIds(songIds: string[]) {
    const cacheKey = `several-songs-${songIds.toString()}`;
    const cache = await this.cacheService.get<Array<Song>>(`several-songs-${songIds.toString()}`);

    if (cache) {
      return {
        status: 200,
        data: cache,
      }
    }

    await this.ensureAccessToken();

    const _fetch = await fetch(`https://api.spotify.com/v1/tracks?ids=${songIds.join(',')}`, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`
      },
    });

    const res = await _fetch.json();
    const data = res.tracks.map((song) => {
      return {
        id: song.id,
        name: song.name,
        url: song.preview_url,
        playable: !!song.preview_url,
      }
    }) as Array<Song>

    await this.cacheService.set(cacheKey, data);

    return {
      status: _fetch.status,
      data: data
    }
  }

  async getAlbum(albumId: string) {
    const cacheKey = `album-${albumId}`;
    const cache = await this.cacheService.get<FullAlbum>(`album-${albumId}`);

    if (cache) {
      return {
        status: 200,
        data: cache,
      }
    }

    await this.ensureAccessToken();

    const _fetch = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`
      },
    });

    const res = await _fetch.json();
    const data = {
      id: res.id,
      name: res.name,
      image: getBestFitImage(res.images),
      artists: res.artists.map(({name}) => name),
      songs: res.tracks.items.map((song) => {
        return {
          id: song.id,
          name: song.name,
          url: song.preview_url,
          playable: !!song.preview_url,
        } 
      }),
    } as FullAlbum

    await this.cacheService.set(cacheKey, data);

    return {
      status: _fetch.status,
      data: data
    }
  }

  async getArtistsBySearch(search: string) {
    const cacheKey = `search-${search}`;
    const cache = await this.cacheService.get<Array<Artist>>(`search-${search}`);

    if (cache) {
      return {
        status: 200,
        data: cache,
      }
    }

    await this.ensureAccessToken();

    const _fetch = await fetch(`https://api.spotify.com/v1/search?q=${search}&type=artist&limit=20`, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`
      }
    });

    const res = await _fetch.json();
    const data = res.artists.items.map((artist) => {
      return {
        id: artist.id,
        name: artist.name,
        image: getBestFitImage(artist.images),
      }
    }) as Array<Artist>

    await this.cacheService.set(cacheKey, data);

    return {
      status: _fetch.status,
      data: data
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
}
