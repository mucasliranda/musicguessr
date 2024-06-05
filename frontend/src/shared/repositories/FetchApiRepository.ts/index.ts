import { Album, Artist, FullAlbum, FullPlaylist, Playlist, Song } from "src/shared/model";
import { ApiRepository } from "../ApiRepository";



interface CreateGameByAlbumsDto {
  gameId: string;
  albums: {[key: string]: string[]};
}

interface CreateGameBySongs {
  gameId: string;
  songs: Array<Song>;
}

const fetchDefaultOpts = {
  cache: 'no-cache',
} as RequestInit;

class FetchApiRepository
  implements ApiRepository {
  private baseUrl = 'http://localhost:3005';

  async getArtists(search: string): Promise<Array<Artist>> {
    if (!search) {
      return [];
    }
    const response = await fetch(`${this.baseUrl}/search/artists?q=${search}`, {...fetchDefaultOpts});
    const data = await response.json();
    return data.artists;
  }

  async getFullSearch(search: string): Promise<{ artists: Array<Artist>; playlists: Array<Playlist> }> {
    if (!search) {
      return { artists: [], playlists: [] };
    }
    const response = await fetch(`${this.baseUrl}/search?q=${search}`, {...fetchDefaultOpts});
    const data = await response.json();
    return data;
  }

  async getAlbumsByArtistId(artistId: string | undefined): Promise<Array<Album>> {
    if (!artistId) {
      return [];
    }
    const response = await fetch(`${this.baseUrl}/artist/albums?q=${artistId}`, {...fetchDefaultOpts});
    const data = await response.json();
    return data.albums;
  }

  async getFullAlbum(albumId: string | undefined): Promise<FullAlbum> {
    if (!albumId) {
      throw new Error('Album ID is required');
    }
    const response = await fetch(`${this.baseUrl}/album?q=${albumId}`, {...fetchDefaultOpts});
    const data = await response.json();
    return data.album;
  }

  async getPlaylistsByCategory(categoryId: string): Promise<Array<Playlist>> {
    const response = await fetch(`${this.baseUrl}/playlists/${categoryId}`, {...fetchDefaultOpts});
    const data = await response.json();
    return data.playlists;
  }

  async getPlaylist(playlistId: string): Promise<FullPlaylist> {
    const response = await fetch(`${this.baseUrl}/playlist?q=${playlistId}`, {...fetchDefaultOpts});
    const data = await response.json();
    return data.playlist;
  }



  async createGameByAlbums({ gameId, albums }: CreateGameByAlbumsDto): Promise<void> {
    await fetch(`${this.baseUrl}/game/albums`, {
      ...fetchDefaultOpts,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ gameId, albums }),
    });
  }

  async createGameBySongs({ gameId, songs }: CreateGameBySongs): Promise<void> {
    await fetch(`${this.baseUrl}/game/songs`, {
      ...fetchDefaultOpts,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ gameId, songs }),
    });
  }
}

export const fetchApi = new FetchApiRepository();