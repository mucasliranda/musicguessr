import { Injectable } from "@nestjs/common";
import { SongsRepository } from "../repository/songsRepository";
import { CacheService } from "src/cache/cacheService";

// 37i9dQZF1DZ06evO3WooFO this is blink

const playlistsIds = [

]

@Injectable()
export class SongsService {
  constructor(
    private readonly songsRepository: SongsRepository,
  ) {}

  async getPlaylist(playlistId: string) {
    const playlist = await this.songsRepository.getPlaylist(playlistId);

    return {
      playlist: playlist.data
    };
  }

  async getPlaylistsByCategory(categoryId: string) {
    const playlists = await this.songsRepository.getPlaylistsByCategory(categoryId);

    return {
      playlists: playlists.data
    };
  }

  async getArtistAlbums(artistId: string) {
    const albums = await this.songsRepository.getArtistAlbums(artistId);
  
    return {
      albums: albums.data
    };
  }

  async getSongsByAlbum(albumId: string) {
    const songs = await this.songsRepository.getSongsByAlbum(albumId);

    return {
      songs: songs.data
    };
  }

  async getSongById(songId: string) {
    const song = await this.songsRepository.getSongById(songId);

    return {
      song: song.data
    };
  }

  async getSeveralSongsByIds(songIds: string[]) {
    const songs = await this.songsRepository.getSeveralSongsByIds(songIds);

    return {
      songs: songs.data
    };
  }

  async getFullAlbum(albumId: string) {
    const album = await this.songsRepository.getFullAlbum(albumId);

    return {
      album: album.data
    };
  }

  async getArtistsBySearch(search: string) {
    const artists = await this.songsRepository.getArtistsBySearch(search);

    return {
      artists: artists.data
    };
  }
};