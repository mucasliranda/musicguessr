import { Player, Song } from "src/shared/model";
import { SocketResponse } from "src/shared/repositories/SocketRepository";
import { GameEmitterUseCase } from "src/shared/useCases/gameUseCases/GameEmitterUseCase";
import { create } from "zustand";
import { useTimerStore } from "../timer";
import { SongPlayerManager } from "src/shared/songPlayerManager";
import { SocketSingleton } from "src/shared/repositories/socketClient";



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
  isGameStarted: Boolean,
  guess: Guess | null,
  isRoundEnded: Boolean
}

type Actions = {
  startGame: () => void;
  onStartGame: () => void;
  guessSong: (song: Song) => void;
  timedOut: () => void;
  onChangePlayers: (response: SocketResponse<{ players: Array<Player> }>) => void;
  onNewRound: (response: SocketResponse<{currentSong: CurrentSong, songs: Array<Song>}>) => void;
  onEndRound: (response: SocketResponse<{players: Array<Player>}>) => void;
}

const gameEmitterUseCase = new GameEmitterUseCase(
  SocketSingleton.getSocket()
);

export const useGameStore = create<State & Actions>((set) => ({
  players: [],
  gameId: null,
  songs: [],
  currentSong: null,
  isGameStarted: false,
  guess: null,
  isRoundEnded: false,
  startGame: () => {
    gameEmitterUseCase.emitStartGame();
  },
  onStartGame: () => {
    set((state) => ({ ...state, isGameStarted: true }));
  },
  guessSong: (song: Song) => set((state) => {
    if (!!!state.guess) {
      const songGuessed = song;

      state = {
        ...state,
        guess: {
          ...songGuessed,
          right: state.currentSong?.id === songGuessed.id
        }
      }
      
      gameEmitterUseCase.emitGuessSong(songGuessed);
    }
    return state;
  }),
  timedOut: () => {
    gameEmitterUseCase.emitTimedOut();
  },
  onChangePlayers: ({ data }) => {
    set((state) => ({ ...state, players: data.players }));
  },
  onNewRound: ({ data }) => {
    set((state) => ({
      ...state,
      isRoundEnded: false,
      currentSong: data.currentSong,
      songs: data.songs,
      guess: null
    }));
    useTimerStore.getState().startTimer(); // startTimer
    SongPlayerManager.playSong(data.currentSong); // playSong
  },
  onEndRound: ({ data }) => {
    set((state) => ({
      ...state,
      isRoundEnded: true,
      players: data.players
    }));
    useTimerStore.getState().startTimer(5000); // startTimer parcial
  }
}));