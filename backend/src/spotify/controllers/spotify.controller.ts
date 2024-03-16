import { Controller, Get, Query } from '@nestjs/common';
import { SpotifyService } from '../services/spotify.service';

@Controller()
export class SpotifyController {
  constructor(private readonly spotifyService: SpotifyService) {}

  @Get('/search/artists')
  getArtistsBySearch(@Query('q') q: string) {
    return this.spotifyService.getArtistsBySearch(q);
  }

  @Get('/artist/albums')
  getArtistAlbums(@Query('q') q: string) {
    return this.spotifyService.getArtistAlbums(q);
  }
}