import { Controller, Get, Query } from '@nestjs/common';
import { SpotifyService } from '../services/spotify.service';

@Controller()
export class SpotifyController {
  constructor(private readonly spotifyService: SpotifyService) {}

  @Get('/search/artists')
  async getArtistsBySearch(@Query('q') q: string) {
    const response = await this.spotifyService.getArtistsBySearch(q);

    return {
      artists: response.data
    };
  }

  @Get('/album/songs')
  async getSongsByAlbum(@Query('q') q: string) {
    const response = await this.spotifyService.getSongsByAlbum(q);

    return {
      songs: response.data
    };
  }

  @Get('/album')
  async getAlbum(@Query('q') q: string) {
    const response = await this.spotifyService.getAlbum(q);

    return {
      album: response.data
    };
  }

  @Get('/artist/albums')
  async getArtistAlbums(@Query('q') q: string) {
    const response = await this.spotifyService.getArtistAlbums(q);

    return {
      albums: response.data
    };
  }
}