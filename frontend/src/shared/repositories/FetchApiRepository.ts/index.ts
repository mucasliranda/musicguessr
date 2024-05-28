import { Album, Artist, FullAlbum, FullPlaylist, Playlist } from "src/shared/model";
import { ApiRepository } from "../ApiRepository";



interface CreateGameDto {
  gameId: string;
  albums?: {[key: string]: string[]};
  songsId?: string[];
}

class FetchApiRepository
  implements ApiRepository {
  private baseUrl = 'http://localhost:3005';

  async getArtists(search: string): Promise<Array<Artist>> {
    if (!search) {
      return [];
    }
    const response = await fetch(`${this.baseUrl}/search/artists?q=${search}`);
    const data = await response.json();
    return data.artists;
  }

  async getAlbumsByArtistId(artistId: string | undefined): Promise<Array<Album>> {
    if (!artistId) {
      return [];
    }
    const response = await fetch(`${this.baseUrl}/artist/albums?q=${artistId}`);
    const data = await response.json();
    return data.albums;
  }

  async getFullAlbum(albumId: string | undefined): Promise<FullAlbum> {
    if (!albumId) {
      throw new Error('Album ID is required');
    }
    const response = await fetch(`${this.baseUrl}/album?q=${albumId}`);
    const data = await response.json();
    return data.album;
  }

  async getPlaylistsByCategory(categoryId: string): Promise<Array<Playlist>> {
    const response = await fetch(`${this.baseUrl}/playlists/${categoryId}`);
    const data = await response.json();
    return data.playlists;
  }

  async getPlaylist(playlistId: string): Promise<FullPlaylist> {
    const response = await fetch(`${this.baseUrl}/playlist?q=${playlistId}`);
    const data = await response.json();
    return data.playlist;
  }



  async createGame({ gameId, albums, songsId }: CreateGameDto): Promise<void> {
    await fetch(`${this.baseUrl}/game`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ gameId, albums, songsId }),
    });
  }
}

export const fetchApi = new FetchApiRepository();