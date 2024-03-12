import { Test, TestingModule } from '@nestjs/testing';
import { GameService } from './game.service';
import { ConfigModule } from '@nestjs/config'
import { GameRepository } from '../repositories/game-repository';
import { RoundRepository } from '../repositories/round-repository';

describe('GameService', () => {
  let service: GameService;

  beforeEach(async () => {
    const gameRepositoryMock = {
      create: jest.fn().mockResolvedValue(undefined),
      // Adicione outras funções necessárias aqui
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GameService,
        // Adicione os repositórios aqui
        {
          provide: GameRepository,
          useValue: gameRepositoryMock, // Substitua isso pelo mock do repositório se necessário
        },
        {
          provide: RoundRepository,
          useValue: {}, // Substitua isso pelo mock do repositório se necessário
        },
      ],
    }).compile();

    service = module.get<GameService>(GameService);
  });

  it('Service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('createGame should be undefined', async () => {
    expect(await service.createGame({gameId: 'gameId', artistId: 'artistId'}))
      .toBeUndefined();
  });
});