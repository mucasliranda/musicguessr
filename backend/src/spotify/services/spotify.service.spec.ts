import { Test, TestingModule } from '@nestjs/testing';
import { SpotifyService } from './spotify.service';
import { ConfigModule } from '@nestjs/config'
import config from '../../config/env'

describe('SpotifyService', () => {
  let service: SpotifyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpotifyService],
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [config]
        }),
      ],
    }).compile();

    service = module.get<SpotifyService>(SpotifyService);
  });

  it('Service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getAccessToken should return an access token', async () => {
    const accessToken = await service.getAccessToken();
    expect(accessToken).toBeDefined();
    expect(typeof accessToken).toBe('string');
  });

  it('getTopTracksByArtist should return status code 200', async () => {
    const artistId = '6FBDaR13swtiWwGhX1WQsP';
    const response = await service.getTopTracksByArtist(artistId);

    expect(response).toBeDefined();
    expect(response.status).toBe(200);
  });

  it('getTopTracksByArtist should return an array of string', async () => {
    const artistId = '6FBDaR13swtiWwGhX1WQsP';
    const response = await service.getTopTracksByArtist(artistId);

    expect(response).toBeDefined();
    expect(typeof response.tracks).toBe('object');
    expect(typeof response.tracks[0]).toBe('string');
  });

  it('getArtistsBySearch should return status code 200', async () => {
    const artistId = 'queen';
    const response = await service.getArtistsBySearch(artistId);

    expect(response).toBeDefined();
    expect(response.status).toBe(200);
  });
});
