// I'M BUILDING A SONG GUESS GAME, WHERE PLAYERS WILL JOIN A GAME AND GUESS THE SONG THAT IS PLAYING
// AT A SPECIFIC TIME. THE GAME WILL HAVE ROUNDS, EACH ROUND WILL HAVE 10 SECS TO GUESS THE SONG.
// THE PLAYER THAT GUESS RIGHT WILL RECEIVE POINTS BASED ON TIME LEFT TO GUESS.
// THE GAME WILL HAVE A LIST OF SONGS, EACH SONG WILL HAVE A UUID, BASED ON IT, WILL GET THE NAME AND URL
// TO PLAY THE SONG.

import { Song } from "src/shared/model";

export default class Game {
  constructor (
    gameId: string,
    songs: Array<Song> = []
  ) {
    this.gameId = gameId
    this.songs = songs
  }

  private gameId: string;
  private players: Player[] = [];
  private currentSong: Song & { startAt: number };
  private currentRound: number;
  private songs: Array<Song>;

  public addSongs(songs: Array<Song>) {
    songs = songs.filter(({id}) => !this.songs.some(song => song.id !== id))

    this.songs.push(...songs);

    console.log({songs: this.songs})

    return songs;
  };

  private guessTime = 10000 // 10 SECS
  private playersPlayed = 0;
  private totalPlayers = 0; // Atualize este valor de acordo com o número de jogadores no seu jogo

  private subscribers = [];

  public subscribe(fn) {
    this.subscribers.push(fn);
  }

  public publish(data: any) {
    for (let subscriber of this.subscribers) {
      subscriber(data);
    }
  }

  private changeTotalPlayers() {
    this.totalPlayers = this.players.length
  }

  private increasePlayersPlayed() {
    this.playersPlayed++;
    if(this.playersPlayed >= this.totalPlayers) {
      console.log('ACABA O ROUND AQUI')

      this.endRound();
    }
  }

  private clearPlayersPlayed() {
    this.playersPlayed = 0;
  }

  public addPlayer({ id, name }) {
    const player = new Player(id, name)

    this.players.push(player)
    this.changeTotalPlayers();
  }

  public removePlayer({ playerId }) {
    this.players = this.players.filter(player => player.getPlayerId() !== playerId)
    this.changeTotalPlayers();
  }

  public getPlayers() {
    const players = this.players.map((player) => {
      return {
        id: player.getPlayerId(),
        score: player.getScore(),
        name: player.getPlayerName()
      }
    })

    console.log({'players na entity':players})

    return players
  }

  public startGame() {
    this.currentRound = 0
    console.log('Game started!')

    this.publish({ event: 'startGame' }); // Notificar todos os assinantes

    return this.onNextRound();
  }

  public onNextRound() {
    this.currentRound++
  
    // GET A RANDOM SONG
    const rightSongIndex = Math.floor(Math.random() * this.songs.length)

    // GET A RANDOM START TIME
    const startAt = Math.floor(Math.random() * 27)

    this.currentSong = {
      ...this.songs[rightSongIndex],
      startAt: startAt
    }

    // Vou retornar somente 6 músicas para o usuário poder chutar, tem que ser a resposta correta +5 aleatórias
    const songsToGuess = [
      this.songs[rightSongIndex]
    ]

    if (this.songs.length === 0) {
      throw new Error('NO_SONGS_TO_GUESS')
    }

    while(
      songsToGuess.length < 6
      && !(songsToGuess.length === this.songs.length)
    ) {
      const randomIndex = Math.floor(Math.random() * this.songs.length)
      const randomSong = this.songs[randomIndex]

      if(!songsToGuess.includes(randomSong)) {
        songsToGuess.push(randomSong)
      }
    }

    songsToGuess.sort(() => Math.random() - 0.5)
    
    this.publish({ event: 'newRound', currentSong: this.currentSong, songs: songsToGuess }); //
  }

  private endRound() {
    this.publish({ event: 'endRound', players: this.getPlayers() }); // Notificar todos os assinantes
    this.clearPlayersPlayed();

    console.log('ESPERANDO 5 SEGUNDOS PARA O PRÓXIMO ROUND')
    setTimeout(() => {
      this.onNextRound();
    }, 5000)
  }

  public guessSong({ playerId, songGuessed, timePassed = 0 }: { playerId: string, songGuessed: Song, timePassed?: number }) {
    // CHECK IF THE GUESS IS RIGHT
    // IF RIGHT, ADD POINTS TO THE USER
    // TIME PASSED WILL BE MILISECONDS SINCE THE SONG STARTED
    const player = this.players.find(player => player.getPlayerId() === playerId)

    if (player) {
      if(
        songGuessed.id == this.currentSong.id 
        && timePassed <= this.guessTime
      ) {
        // const points = this.guessTime - timePassed
        const points = 10
        player.addPoints(points)

        console.log('Player guessed right!', player, points)
      }
      
      this.increasePlayersPlayed();
    }
  }

  public timedOut({ playerId }) {
    const player = this.players.find(player => player.getPlayerId() === playerId)

    if (!!player) {
      this.increasePlayersPlayed();
    }
  }

  public getSongs() {
    return this.songs
  }
}

class Player {
  constructor(public readonly id: string, public readonly name: string, public score: number = 0) {}

  public addPoints(points: number) {
    this.score += points
  }

  public getPlayerId() {
    return this.id
  }

  public getPlayerName() {
    return this.name
  }

  public getScore() {
    return this.score
  }
}

// const newPlayer = new Player('123', 0)

// private state = {
//   // UUID THAT WILL BE GENERATED ONCE THE GAME STARTS
//   gameId: '',
//   // ARRAY OF UUID PLAYERS
//   players: [
    
//   ] as Array<Player>,
//   // ARRAY OF TRACKS UUID
//   songs: [],
//   // CURRENT ROUND
//   currentRound: 0,
//   // CURRENT TRACK UUID, NAME AND START TIME
//   currentTrack: {
//     trackId: '',
//     trackName: '',
//     startAt: 0,
//   },
// }