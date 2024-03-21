import Game from './game';

describe('Game', () => {
  let game;
  let songs;
  
  const player1 = 'player1';
  const player2 = 'player2';
  const player3 = 'player3';

  beforeEach(() => {
    songs = [
      { id: '1', name: 'song1', url: 'url1' },
      { id: '2', name: 'song2', url: 'url2' },
    ];
    game = new Game('game1', songs);
  });

  it('should create a new game with given id and songs', () => {
    expect(game).toBeDefined();
    expect(game.gameId).toBe('game1');
    expect(game.songs).toEqual(songs);
  });

  it('should allow subscribers to subscribe', () => {
    const fn = jest.fn();
    game.subscribe(fn);
    expect(game.subscribers).toContain(fn);
  });

  it('should publish data to all subscribers', () => {
    const fn1 = jest.fn();
    const fn2 = jest.fn();
    game.subscribe(fn1);
    game.subscribe(fn2);
    game.publish('test data');
    expect(fn1).toHaveBeenCalledWith('test data');
    expect(fn2).toHaveBeenCalledWith('test data');
  });

  // Adicione mais testes conforme necessário
});