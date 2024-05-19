import { Controller, Get, Query } from '@nestjs/common';
import { SongsService } from '../services/songs.service';

@Controller()
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Get('/search/artists')
  async getArtistsBySearch(@Query('q') q: string) {    
    return this.songsService.getArtistsBySearch(q);
  }

  @Get('/album/songs')
  async getSongsByAlbum(@Query('q') q: string) {
    return this.songsService.getSongsByAlbum(q);
  }

  @Get('/album')
  async getAlbum(@Query('q') q: string) {
    return this.songsService.getAlbum(q);
  }

  @Get('/artist/albums')
  async getArtistAlbums(@Query('q') q: string) {
    return this.songsService.getArtistAlbums(q);
  }
}