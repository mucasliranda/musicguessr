import { Injectable } from "@nestjs/common";
import { SongsRepository } from "../repository/songsRepository";

@Injectable()
export class SongsService {
  constructor(
    private readonly songsRepository: SongsRepository,
  ) {}

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

  async getAlbum(albumId: string) {
    const album = await this.songsRepository.getAlbum(albumId);

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