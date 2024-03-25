// I'M BUILDING A SONG GUESS GAME, WHERE PLAYERS WILL JOIN A GAME AND GUESS THE SONG THAT IS PLAYING
// AT A SPECIFIC TIME. THE GAME WILL HAVE ROUNDS, EACH ROUND WILL HAVE 10 SECS TO GUESS THE SONG.
// THE PLAYER THAT GUESS RIGHT WILL RECEIVE POINTS BASED ON TIME LEFT TO GUESS.
// THE GAME WILL HAVE A LIST OF SONGS, EACH SONG WILL HAVE A UUID, BASED ON IT, WILL GET THE NAME AND URL
// TO PLAY THE SONG.

import { Song } from "src/shared/model";

export default class Game {
  constructor (
    gameId: string,
    songs: Array<Song>
  ) {
    this.gameId = gameId
    this.players = []
    this.songs = songs
  }

  private gameId: string;
  private players: Player[] = [];
  private currentSong: Song & { startAt: number };
  private currentRound: number;
  private songs: Array<Song> = [];

  private guessTime = 10000 // 10 SECS
  private playersPlayed = 0;
  private totalPlayers = 0; // Atualize este valor de acordo com o número de jogadores no seu jogo

  private subscribers = [];

  private changeTotalPlayers() {
    this.totalPlayers = this.players.length
  }

  private increasePlayersPlayed() {
    this.playersPlayed++;
    if(this.playersPlayed >= this.totalPlayers) {
      console.log('ACABA O ROUND AQUI')

      this.endRound();

      this.onNextRound();
      this.clearPlayersPlayed();
      // setTimeout(() => {
      // }, 5000);
    }
  }

  private clearPlayersPlayed() {
    this.playersPlayed = 0;
  }

  public debug() {
    console.log({
      currentSong: this.currentSong,
      currentRound: this.currentRound,
      songs: this.songs,
    })
  }

  public subscribe(fn) {
    this.subscribers.push(fn);
  }

  public publish(data: any) {
    for (let subscriber of this.subscribers) {
      subscriber(data);
    }
  }

  public addPlayer({ playerId }) {
    const player = new Player(playerId)

    this.players.push(player)
    this.changeTotalPlayers();
  }

  public removePlayer({ playerId }) {
    this.players = this.players.filter(player => player.getPlayerId() !== playerId)
    this.changeTotalPlayers();
  }

  public getPlayers() {
    return this.players.map((player) => {
      return {
        playerId: player.getPlayerId(),
        score: player.getScore(),
      }
    })
  }

  public startGame() {
    this.currentRound = 0
    this.onNextRound()

    

    console.log('Game started!')
    this.publish({ event: 'startGame', songs: this.getSongs() }); // Notificar todos os assinantes
  }

  public onNextRound() {
    this.currentRound++
  
    // GET A RANDOM SONG
    const randomIndex = Math.floor(Math.random() * this.songs.length)
    
    // GET A RANDOM START TIME
    const startAt = Math.floor(Math.random() * 27)

    this.currentSong = {
      ...this.songs[randomIndex],
      startAt: startAt
    }
    
    this.publish({ event: 'newRound', currentSong: this.currentSong }); //



    // this.timeoutId = setTimeout(() => {
    //   this.onNextRound();
    // }, this.guessTime); // 10000 milissegundos = 10 segundos
  }

  public endRound() {
    this.publish({ event: 'endRound' }); // Notificar todos os assinantes
  }

  public guessSong({ playerId, songGuessed, timePassed = 0 }: { playerId: string, songGuessed: Song, timePassed?: number }) {
    // CHECK IF THE GUESS IS RIGHT
    // IF RIGHT, ADD POINTS TO THE USER
    // TIME PASSED WILL BE MILISECONDS SINCE THE SONG STARTED
    const player = this.players.find(player => player.getPlayerId() === playerId)

    if (player) {
      if(songGuessed.id == this.currentSong.id && timePassed <= this.guessTime) {
        const points = this.guessTime - timePassed
        player.addPoints(points)

        console.log('Player guessed right!', player, points)
        // return
      }
      this.increasePlayersPlayed();
      this.publish({ event: 'guess', players: this.getPlayers() }); // Notificar todos os assinantes
      // console.log('Player guessed wrong!', player)
      // this.publish({ event: 'guess', player }); // Notificar todos os assinantes


    
      // if (this.playersPlayed >= this.totalPlayers) {
      //   // this.roundEnded();
      //   clearTimeout(this.timeoutId); // Limpar o timeout
      // }
    }
  }

  public timedOut({ playerId }) {
    const player = this.players.find(player => player.getPlayerId() === playerId)

    if (player) {
      this.increasePlayersPlayed();
    }
  }

  public getSongs() {
    return this.songs
  }

}

class Player {
  constructor(public readonly playerId: string, public score: number = 0) {}

  public addPoints(points: number) {
    this.score += points
  }

  public getScore() {
    return this.score
  }

  public getPlayerId() {
    return this.playerId
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