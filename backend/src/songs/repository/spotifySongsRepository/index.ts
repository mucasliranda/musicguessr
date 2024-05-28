import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { SongsRepository } from "../songsRepository";
import { CacheService } from "src/cache/cacheService";
import { Album, Artist, FullAlbum, FullPlaylist, Playlist, Song } from "src/shared/model";



interface Image {
  url: string;
  width: number | null;
  height: number | null;
}

function getBestFitImage(images: Image[] | null) {
  // preciso pegar a imagem que tem a menor diferença entre a largura e a altura
  // e que seja maior ou igual que a largura desejada
  const desiredWidth = 300; // Substitua isso pela largura desejada
  let selectedImage = images[0];

  if (!!!images.length) return selectedImage?.url;

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
  ) { }
  private accessToken: string | null;
  private clientId: string = this.configService.get<string>('SPOTIFY_CLIENT_ID');
  private clientSecret: string = this.configService.get<string>('SPOTIFY_CLIENT_SECRET');
  private tokenObtainedAt: number;



  async getPlaylist(playlistId: string) {
    const cacheKey = `playlist-${playlistId}`;
    const cache = await this.cacheService.get<FullPlaylist>(cacheKey);

    if (cache) {
      return {
        status: 200,
        data: cache,
      }
    }

    await this.ensureAccessToken();

    const _fetch = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`
      }
    });

    const res = await _fetch.json();
    const data = {
      id: res.id,
      name: res.name,
      image: getBestFitImage(res.images),
      songs: res.tracks.items.map((song) => {
        return {
          id: song.track.id,
          name: song.track.name,
          url: song.track.preview_url,
          playable: !!song.track.preview_url,
          image: getBestFitImage(song.track.album.images),
          artist: song.track.artists.map(({ name }) => name),
        }
      })
    } as FullPlaylist

    await this.cacheService.set(cacheKey, data);

    return {
      status: _fetch.status,
      data: data
    }
  }

  async getPlaylistsByCategory(categoryId: string) {
    const cacheKey = `playlists-${categoryId}`;
    const cache = await this.cacheService.get<Array<Playlist>>(cacheKey);

    if (cache) {
      return {
        status: 200,
        data: cache,
      }
    }

    await this.ensureAccessToken();

    const _fetch = await fetch(`https://api.spotify.com/v1/browse/categories/${categoryId}/playlists`, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`
      }
    });

    const res = await _fetch.json();
    const data = res.playlists.items.reduce((unique, playlist) => {
      if (!unique.some(item => item.id === playlist.id)) {
        unique.push({
          id: playlist.id,
          name: playlist.name,
          image: getBestFitImage(playlist.images),
        });
      }
      return unique;
    }, [] as Array<Playlist>);

    await this.cacheService.set(cacheKey, data);

    return {
      status: _fetch.status,
      data: data
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

  async getSeveralSongsByIds(songsId: string[]) {
    const cacheKey = 'song'
    const cache = await this.cacheService.getMany<Song>(cacheKey, songsId);

    await this.ensureAccessToken();

    const songsNotCached = songsId.filter((id) => !cache.some((song) => song.id === id));

    const promises = [];
    for (let i = 0; i < songsNotCached.length; i += 50) {
      const chunkIds = songsNotCached.slice(i, i + 50);
      const promise = fetch(`https://api.spotify.com/v1/tracks?ids=${chunkIds.join(',')}`, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`
        },
      }).then(response => response.json());
      promises.push(promise);
    }

    const results = await Promise.all(promises);
    const dataFromApi = results.map(result => result.tracks.map((song) => {
      return {
        id: song.id,
        name: song.name,
        url: song.preview_url,
        playable: !!song.preview_url,
      }
    })).flat() as Array<Song>;

    const data = [...cache, ...dataFromApi];

    await this.cacheService.setMany(cacheKey, dataFromApi.map((song) => ({ key: song.id, value: song })));

    return {
      status: 200,
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

  async getFullAlbum(albumId: string) {
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
      artists: res.artists.map(({ name }) => name),
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