// I'M BUILDING A SONG GUESS GAME, WHERE PLAYERS WILL JOIN A GAME AND GUESS THE SONG THAT IS PLAYING
// AT A SPECIFIC TIME. THE GAME WILL HAVE ROUNDS, EACH ROUND WILL HAVE 10 SECS TO GUESS THE SONG.
// THE PLAYER THAT GUESS RIGHT WILL RECEIVE POINTS BASED ON TIME LEFT TO GUESS.
// THE GAME WILL HAVE A LIST OF SONGS, EACH SONG WILL HAVE A UUID, BASED ON IT, WILL GET THE NAME AND URL
// TO PLAY THE SONG.

export default class Game {
  constructor (
    private gameId: string,
    private players: Player[] = [], 
    private currentSong: { id: string, name: string, url: string },
    private currentRound: number = 0,
    private songs: Array<string> = [],

  ) {
    this.gameId = gameId
  }

  private guessTime = 10000 // 10 SECS

  private subscribers = [];

  public subscribe(fn) {
    this.subscribers.push(fn);
  }

  public publish(data: any) {
    for (let subscriber of this.subscribers) {
      subscriber(data);
    }
  }

  public joinGame({ userId }) {
    const player = new Player(userId)

    this.players.push(player)
  }

  public removePlayer({ userId }) {
    this.players = this.players.filter(player => player.getUserId() !== userId)
  }

  public startGame() {
    
  }

  public guessTrack({ userId, guess, timePassed }) {
    // CHECK IF THE GUESS IS RIGHT
    // IF RIGHT, ADD POINTS TO THE USER
    // TIME PASSED WILL BE MILISECONDS SINCE THE SONG STARTED
    const player = this.players.find(player => player.getUserId() === userId)

    if (player) {
      if(guess == this.currentSong.id && timePassed <= this.guessTime) {
        const points = this.guessTime - timePassed
        player.addPoints(points)

        console.log('Player guessed right!', player, points)
        this.publish({ event: 'correctGuess', player, points }); // Notificar todos os assinantes
        return
      }
      console.log('Player guessed wrong!', player)
      // this.publish({ event: 'wrongGuess', player }); // Notificar todos os assinantes
    }
  }

  
}

class Player {
  constructor(private readonly userId: string, private score: number = 0) {}

  public addPoints(points: number) {
    this.score += points
  }

  public getScore() {
    return this.score
  }

  public getUserId() {
    return this.userId
  }
}

const newPlayer = new Player('123', 0)

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