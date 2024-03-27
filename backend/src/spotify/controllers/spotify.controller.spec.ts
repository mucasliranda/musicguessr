import { Test, TestingModule } from '@nestjs/testing';
import { SpotifyController } from './spotify.controller';
import { SpotifyService } from '../services/spotify.service';
import { ConfigModule } from '@nestjs/config'
import config from '../../config/env'
import { SpotifyRepository } from '../repositories/spotify-repository';
import { ApiSpotifyRepository } from '../repositories/api/api-spotify-repository';

describe('SpotifyController', () => {
  let spotifyController: SpotifyController;

  const songId = '4LJhJ6DQS7NwE7UKtvcM52' // whats my age again
  const artistId = '6FBDaR13swtiWwGhX1WQsP' // blink 182
  const artist = 'blink'
  const album = "3yNdgwTrOazWbyJrkKemGp"

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SpotifyController],
      providers: [
        SpotifyService,
        {
          provide: SpotifyRepository,
          useClass: ApiSpotifyRepository,
        }
      ],
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [config]
        }),
      ],
    }).compile();

    spotifyController = app.get<SpotifyController>(SpotifyController);
  });

  describe('/search/artists', () => {
    it('should be defined', () => {
      expect(spotifyController.getArtistsBySearch('queen')).toBeDefined();
    });

    it('should return an array of artists', async () => {
      const response = await spotifyController.getArtistsBySearch(artist);
      expect(response).toBeDefined();
      expect(response.artists).toBeDefined();
      
      const artists = response.artists;

      artists.forEach(artist => {
        expect(artist).toHaveProperty('id');
        expect(artist).toHaveProperty('name');
        expect(artist).toHaveProperty('image');
      });
    });
  });

  describe('/album/songs', () => {
    it('should be defined', () => {
      expect(spotifyController.getSongsByAlbum(album)).toBeDefined();
    });

    it('should return an array of songs', async () => {
      const response = await spotifyController.getSongsByAlbum(album);
      expect(response).toBeDefined();
      expect(response.songs).toBeDefined();
      
      const songs = response.songs;

      songs.forEach(song => {
        expect(song).toHaveProperty('id');
        expect(song).toHaveProperty('name');
        expect(song).toHaveProperty('url');
      });
    });
  });

  describe('/album', () => {
    it('should be defined', () => {
      expect(spotifyController.getAlbum(album)).toBeDefined();
    });

    it('should return an album', async () => {
      const response = await spotifyController.getAlbum(album);
      expect(response).toBeDefined();
      expect(response.album).toBeDefined();
      
      const albumResponse = response.album;

      expect(albumResponse).toHaveProperty('id');
      expect(albumResponse).toHaveProperty('name');
      expect(albumResponse).toHaveProperty('image');
      expect(albumResponse).toHaveProperty('artists');
      expect(albumResponse).toHaveProperty('songs');
    });

    it('should return an album with songs', async () => {
      const response = await spotifyController.getAlbum(album);
      expect(response).toBeDefined();
      
      const albumResponse = response.album;

      expect(albumResponse).toHaveProperty('songs');
      expect(Array.isArray(albumResponse.songs)).toBe(true);
      
      albumResponse.songs.forEach(song => {
        expect(song).toHaveProperty('id');
        expect(song).toHaveProperty('name');
        expect(song).toHaveProperty('url');
      });
    });
  });

  describe('/artist/albums', () => {
    it('should be defined', () => {
      expect(spotifyController.getArtistAlbums(artistId)).toBeDefined();
    });

    it('should return an array of albums', async () => {
      const response = await spotifyController.getArtistAlbums(artistId);
      expect(response).toBeDefined();
      expect(response.albums).toBeDefined();
      
      const albums = response.albums;

      albums.forEach(album => {
        expect(album).toHaveProperty('id');
        expect(album).toHaveProperty('name');
        expect(album).toHaveProperty('image');
      });
    });
  });
});
