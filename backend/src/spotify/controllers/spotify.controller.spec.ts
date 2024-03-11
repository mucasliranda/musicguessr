import { Test, TestingModule } from '@nestjs/testing';
import { SpotifyController } from './spotify.controller';
import { SpotifyService } from '../services/spotify.service';
import { ConfigModule } from '@nestjs/config'
import config from '../../config/env'

describe('SpotifyController', () => {
  let spotifyController: SpotifyController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SpotifyController],
      providers: [SpotifyService],
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [config]
        }),
      ],
    }).compile();

    spotifyController = app.get<SpotifyController>(SpotifyController);
  });

  describe('search artists', () => {
    it('/search/artists should be defined', () => {
      expect(spotifyController.getArtistsBySearch('queen')).toBeDefined();
    });

    it('/search/artists should return an array of artists', async () => {
      const response = await spotifyController.getArtistsBySearch('queen');
      expect(response).toBeDefined();
      expect(response.artists).toBeDefined();
      expect(response.artists.length).toBeGreaterThan(0);
    });
  });
});
