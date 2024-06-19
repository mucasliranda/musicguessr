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
  private currentSong?: Song & { startAt: number };
  private currentRound: number = 0;
  private songs: Array<Song>;

  public addSongs(songs: Array<Song>) {
    songs = songs.filter(({id}) => !this.songs.some(song => song.id !== id))

    this.songs.push(...songs);

    return songs;
  };

  private roundDuration = 12000; // 12 SECS
  private songDuration = 3000; // 3 SECS
  private cooldownTime = 5000; // 5 SECS
  private shouldSortStartAt = true;

  private roundStartedAt: number = 0;

  private gameShouldEndOn = {
    type: 'rounds',
    value: 15
  }

  private playersPlayed = 0;
  private totalPlayers = 0;

  private subscribers = [] as Array<Function>;

  public subscribe(fn) {
    this.subscribers.push(fn);
  }

  public publish(data: any) {
    for (let subscriber of this.subscribers) {
      subscriber(data);
    }
  }

  private shouldEndGame() {
    if (this.players.length === 0) {
      return true
    }

    if (this.gameShouldEndOn.type === 'rounds') {
      return this.currentRound > this.gameShouldEndOn.value
    }

    const maxScore = this.players.reduce((acc, player) => Math.max(acc, player.getScore()), 0)

    return maxScore >= this.gameShouldEndOn.value
  }

  private endGame() {
    this.publish({ event: 'endGame', players: this.getPlayers() });

    this.players.forEach(player => player.clearPoints())
  }

  private changeTotalPlayers() {
    this.totalPlayers = this.players.length
  }

  private increasePlayersPlayed() {
    this.playersPlayed++;
    if(this.playersPlayed >= this.totalPlayers) {
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

    return players
  }

  public startGame() {
    this.currentRound = 0

    const {
      roundDuration,
      songDuration,
      cooldownTime
    } = this

    this.publish({ event: 'startGame', roundDuration, songDuration, cooldownTime })

    return this.onNextRound();
  }

  public onNextRound() {
    if (this.shouldEndGame()) {
      return this.endGame();
    }

    this.currentRound++
  
    const randomSongIndex = Math.floor(Math.random() * this.songs.length)
    const randomSong = this.songs[randomSongIndex]

    const startAt = (() => {
      if (
        this.shouldSortStartAt
        && this.songDuration !== null
      ) {
        const songTotalTime = 30000
        const maxStartAt = songTotalTime - this.songDuration
        const startAt = Math.floor(Math.random() * maxStartAt)

        return Math.floor(startAt / 1000)
      }
      return 0
    })();

    this.currentSong = {
      ...randomSong,
      startAt: startAt
    }

    const songsToGuess = [
      randomSong
    ]

    if (this.songs.length === 0) {
      throw new Error('NO_SONGS_TO_GUESS')
    }

    while(
      songsToGuess.length < 6
      && songsToGuess.length !== this.songs.length
    ) {
      const randomIndex = Math.floor(Math.random() * this.songs.length)
      const randomSong = this.songs[randomIndex]

      if(!songsToGuess.includes(randomSong)) {
        songsToGuess.push(randomSong)
      }
    }

    songsToGuess.sort(() => Math.random() - 0.5)

    this.roundStartedAt = new Date().getTime()
    
    this.publish({ event: 'newRound', currentSong: this.currentSong, songs: songsToGuess }); //
  }

  private endRound() {
    this.publish({ event: 'endRound', players: this.getPlayers() }); // Notificar todos os assinantes
    this.clearPlayersPlayed();

    setTimeout(() => {
      this.onNextRound();
    }, this.cooldownTime)
  }

  public guessSong({ playerId, songGuessed, guessedAt }: { playerId: string, songGuessed: Song, guessedAt: number}) {
    // CHECK IF THE GUESS IS RIGHT
    // IF RIGHT, ADD POINTS TO THE USER
    // TIME PASSED WILL BE MILISECONDS SINCE THE SONG STARTED
    const player = this.players.find(player => player.getPlayerId() === playerId)

    if (player) {
      if(
        this.currentSong 
        && songGuessed.id == this.currentSong.id
      ) {
        player.addPoints(this.calculateGuessPoints(guessedAt))
      }
      this.increasePlayersPlayed();
    }
  }

  private calculateGuessPoints(guessedAt: number) {
    const maxPoints = 100;
    const startTime = this.roundStartedAt; // Supondo que você tenha um tempo de início armazenado

    // Calcule o tempo decorrido
    const elapsedTime = guessedAt - startTime;

    // Calcule o tempo decorrido como uma porcentagem do tempo máximo
    const timePassedPercentage = elapsedTime / this.roundDuration;

    // Calcule a pontuação com base na porcentagem do tempo decorrido
    const points = maxPoints * (1 - timePassedPercentage);

    // Certifique-se de que a pontuação não seja menor que 3 ou maior que maxPoints
    return Math.max(3, Math.round(points));
  }

  public timedOut({ playerId }) {
    const player = this.players.find(player => player.getPlayerId() === playerId)

    if (!!player) {
      this.increasePlayersPlayed();
    }
  }

  public setGameConfig({ roundDuration, songDuration, gameMode, value }) {
    this.roundDuration = roundDuration;
    this.songDuration = songDuration;

    this.gameShouldEndOn = {
      type: gameMode,
      value: value
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

  public clearPoints() {
    this.score = 0
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
