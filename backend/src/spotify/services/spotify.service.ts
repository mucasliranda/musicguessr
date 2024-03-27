import { Injectable } from "@nestjs/common";
import { SpotifyRepository } from "../repositories/spotify-repository";

@Injectable()
export class SpotifyService {
  constructor(
    private readonly spotifyRepository: SpotifyRepository,
  ) {}

  getArtistAlbums(artistId: string) {
    return this.spotifyRepository.getArtistAlbums(artistId);
  }

  getSongsByAlbum(albumId: string) {
    return this.spotifyRepository.getSongsByAlbum(albumId);
  }

  getAlbum(albumId: string) {
    return this.spotifyRepository.getAlbum(albumId);
  }

  getArtistsBySearch(search: string) {
    return this.spotifyRepository.getArtistsBySearch(search);
  }
};