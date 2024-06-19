import { Player, Song } from "src/shared/model";
import { SocketResponse } from "src/shared/repositories/SocketRepository";
import { GameEmitterUseCase } from "src/shared/useCases/gameUseCases/GameEmitterUseCase";
import { create } from "zustand";
import { useTimerStore } from "../timer";
import { SongPlayerManager } from "src/shared/songPlayerManager";
import { SocketSingleton } from "src/shared/repositories/socketClient";
import { usePlayerStore } from "../player";



export interface CurrentSong extends Song {
  startAt?: number
}

export interface Guess extends Song {
  right?: boolean;
}

type State = {
  players: Array<Player>,
  gameId: string | null,
  songs: Array<Song>,
  currentSong: CurrentSong | null,
  gameStatus: 'waiting' | 'playing' | 'ended',
  guess: Guess | null,
  isRoundEnded: Boolean
  roundDuration: number,
  songDuration: number | null,
  cooldownTime: number
  gameShouldEndOn: {
    type: string,
    value: number
  }
}

type Actions = {
  startGame: () => void;
  emitGameConfig: ({ roundDuration, songDuration, gameMode, value }: { roundDuration: number, songDuration: number, gameMode: string, value: number }) => void;
  onStartGame: (response: SocketResponse<{ roundDuration: number, songDuration: number, cooldownTime: number }>) => void;
  onEndGame: (response: SocketResponse<{ players: Array<Player> }>) => void;
  guessSong: (song: Song) => void;
  timedOut: () => void;
  onChangePlayers: (response: SocketResponse<{ players: Array<Player> }>) => void;
  onNewRound: (response: SocketResponse<{currentSong: CurrentSong, songs: Array<Song>}>) => void;
  onEndRound: (response: SocketResponse<{players: Array<Player>}>) => void;
  onGameJoined: (response: SocketResponse<{playerId: string}>) => void;
}

const gameEmitterUseCase = new GameEmitterUseCase(
  SocketSingleton.getSocket()
);

export const useGameStore = create<State & Actions>((set) => ({
  players: [],
  gameId: null,
  songs: [],
  currentSong: null,
  gameStatus: 'waiting',

  guess: null,
  isRoundEnded: false,
  roundDuration: 10000,
  songDuration: 2000,
  cooldownTime: 5000,
  gameShouldEndOn: {
    type: 'rounds',
    value: 15
  },

  

  startGame: () => {
    gameEmitterUseCase.emitStartGame();
  },
  emitGameConfig: ({ roundDuration, songDuration, gameMode, value }) => {
    set((state) => ({ ...state, roundDuration, songDuration }));

    gameEmitterUseCase.emitGameConfig({ roundDuration, songDuration, gameMode, value });
  },

  onStartGame: ({ data }) => {
    set((state) => ({ 
      ...state, 
      gameStatus: 'playing',
      roundDuration: data.roundDuration,
      songDuration: data.songDuration,
      cooldownTime: data.cooldownTime
    }));
  },
  async onEndGame({ data }) {
    set((state) => ({ ...state, players: data.players, gameStatus: 'ended' }));

    await useTimerStore.getState().startEndGameTimer();

    set((state) => ({ ...state, gameStatus: 'waiting' }));

    SongPlayerManager.pauseSong();
  },
  guessSong: (song: Song) => set((state) => {
    if (!!!state.guess && !state.isRoundEnded) {
      const songGuessed = song;

      state = {
        ...state,
        guess: {
          ...songGuessed,
          right: state.currentSong?.id === songGuessed.id
        }
      }
      
      gameEmitterUseCase.emitGuessSong({ songGuessed: songGuessed, guessedAt: new Date().getTime() });
    }
    return state;
  }),
  timedOut: () => {
    gameEmitterUseCase.emitTimedOut();
  },
  onChangePlayers: ({ data }) => {
    set((state) => ({ ...state, players: data.players }));
  },
  async onNewRound({ data }) {
    set((state) => ({
      ...state,
      isRoundEnded: false,
      currentSong: data.currentSong,
      songs: data.songs,
      guess: null
    }));
    SongPlayerManager.playSong(data.currentSong); // playSong

    await useTimerStore.getState().startGuessTimer(); // startTimer

    useGameStore.getState().timedOut();
  },
  async onEndRound({ data }) {
    const orderedPlayers = [...data.players].sort((a, b) => b.score - a.score);
    set((state) => ({
      ...state,
      isRoundEnded: true,
      players: orderedPlayers
    }));
    
    const songDuration = useGameStore.getState().songDuration;
    
    if (songDuration !== null) {
      SongPlayerManager.resumeSongOnRoundEnded(); // resume current song without starting from the beginning or stopping
    }

    await useTimerStore.getState().startCooldownTimer(); // startTimer parcial

    useGameStore.getState().timedOut();
  },
  onGameJoined: ({ data }) => {
    usePlayerStore.getState().setPlayerId(data.playerId);
  }
}));