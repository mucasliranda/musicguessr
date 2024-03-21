import { Test, TestingModule } from '@nestjs/testing';
import { SpotifyService } from './spotify.service';
import { ConfigModule } from '@nestjs/config'
import config from '../../config/env'
import { SpotifyRepository } from '../repositories/spotify-repository';
import { ApiSpotifyRepository } from '../repositories/api/api-spotify-repository';



describe('SpotifyService', () => {
  let service: SpotifyService;

  const songId = '4LJhJ6DQS7NwE7UKtvcM52' // whats my age again
  const artistId = '6FBDaR13swtiWwGhX1WQsP' // blink 182
  const artist = 'blink'
  const album = "3yNdgwTrOazWbyJrkKemGp"

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<SpotifyService>(SpotifyService);
  });

  it('Service should be defined', () => {
    expect(service).toBeDefined();
  });



  // GET ARTIST ALBUMS
  describe('getArtistAlbums', () => {
    it('getArtistAlbums should be defined', () => {
      expect(service.getArtistAlbums).toBeDefined();
    });
  
    it('getArtistAlbums should return status code 200', async () => {
      const response = await service.getArtistAlbums(artistId);
      expect(response).toBeDefined();
      expect(response.status).toBe(200);
    });
  
    it('getArtistAlbums should return an array of Album', async () => {
      const response = await service.getArtistAlbums(artistId);
      expect(response).toBeDefined();
    
      const data = response.data
    
      expect(Array.isArray(data)).toBe(true);
      
      data.forEach(album => {
        expect(album).toHaveProperty('id');
        expect(album).toHaveProperty('image');
        expect(album).toHaveProperty('name');
      });
    });
  });



  // GEt SONGS BY ALBUM
  describe('getSongsByAlbum', () => {
    it('getSongsByAlbum should be defined', () => {
      expect(service.getSongsByAlbum).toBeDefined();
    });

    it('getSongsByAlbum should return status code 200', async () => {
      const response = await service.getSongsByAlbum(album);
      expect(response).toBeDefined();
      expect(response.status).toBe(200);
    });

    it('getSongsByAlbum should return an array of Song', async () => {
      const response = await service.getSongsByAlbum(album);
      expect(response).toBeDefined();
    
      const data = response.data
    
      expect(Array.isArray(data)).toBe(true);
      
      data.forEach(song => {
        expect(song).toHaveProperty('id');
        expect(song).toHaveProperty('name');
        expect(song).toHaveProperty('url');
      });
    });
  });



  // GET ARTISTS BY SEARCH
  describe('getArtistsBySearch', () => {
    it('getArtistsBySearch should be defined', () => {
      expect(service.getArtistsBySearch).toBeDefined();
    });

    it('getArtistsBySearch should return status code 200', async () => {
      const response = await service.getArtistsBySearch(artist);
      expect(response).toBeDefined();
      expect(response.status).toBe(200);
    });

    it('getArtistsBySearch should return an array of Artist', async () => {
      const response = await service.getArtistsBySearch('queen');
      expect(response).toBeDefined();
    
      const data = response.data
    
      expect(Array.isArray(data)).toBe(true);
      
      data.forEach(artist => {
        expect(artist).toHaveProperty('id');
        expect(artist).toHaveProperty('name');
        expect(artist).toHaveProperty('image');
      });
    });
  });













  // it('getAccessToken should return an access token', async () => {
  //   const accessToken = await service.getAccessToken();
  //   expect(accessToken).toBeDefined();
  //   expect(typeof accessToken).toBe('string');
  // });

  // it('getTopTracksByArtist should return status code 200', async () => {
  //   const artistId = '6FBDaR13swtiWwGhX1WQsP';
  //   const response = await service.getTopTracksByArtist(artistId);

  //   expect(response).toBeDefined();
  //   expect(response.status).toBe(200);
  // });

  // it('getTopTracksByArtist should return an array of string', async () => {
  //   const artistId = '6FBDaR13swtiWwGhX1WQsP';
  //   const response = await service.getTopTracksByArtist(artistId);

  //   expect(response).toBeDefined();
  //   expect(typeof response.tracks).toBe('object');
  //   expect(typeof response.tracks[0]).toBe('string');
  // });

  // it('getArtistsBySearch should return status code 200', async () => {
  //   const artistId = 'queen';
  //   const response = await service.getArtistsBySearch(artistId);

  //   expect(response).toBeDefined();
  //   expect(response.status).toBe(200);
  // });
});
