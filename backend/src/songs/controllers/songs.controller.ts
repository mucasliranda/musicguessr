import { Controller, Get, Param, Query } from '@nestjs/common';
import { SongsService } from '../services/songs.service';

@Controller()
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Get('/playlist')
  async getPlaylist(@Query('q') q: string) {
    return await this.songsService.getPlaylist(q);
  }

  @Get('/playlists/:categoryId')
  async getPlaylistsByCategory(@Param() params: any) {
    return await this.songsService.getPlaylistsByCategory(params.categoryId);
  }
  
  @Get('/search/artists')
  async getArtistsBySearch(@Query('q') q: string) {    
    return await this.songsService.getArtistsBySearch(q);
  }

  @Get('/search')
  async getFullSearch(@Query('q') q: string) {
    return await this.songsService.getFullSearch(q);
  }

  @Get('/album/songs')
  async getSongsByAlbum(@Query('q') q: string) {
    return await this.songsService.getSongsByAlbum(q);
  }

  @Get('/album')
  async getFullAlbum(@Query('q') q: string) {
    return await this.songsService.getFullAlbum(q);
  }

  @Get('/artist/albums')
  async getArtistAlbums(@Query('q') q: string) {
    return await this.songsService.getArtistAlbums(q);
  }
}