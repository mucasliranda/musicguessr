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
  isGameStarted: Boolean,
  guess: Guess | null,
  isRoundEnded: Boolean

  guessTime: number,
  songDuration: number | null,
  cooldownTime: number
}

type Actions = {
  startGame: () => void;
  emitGameConfig: ({ speed, duration }: { speed: string, duration: string }) => void;
  onStartGame: (response: SocketResponse<{ guessTime: number, songDuration: number, cooldownTime: number }>) => void;
  guessSong: (song: Song) => void;
  timedOut: () => void;
  onChangePlayers: (response: SocketResponse<{ players: Array<Player> }>) => void;
  onNewRound: (response: SocketResponse<{currentSong: CurrentSong, songs: Array<Song>}>) => void;
  onEndRound: (response: SocketResponse<{players: Array<Player>}>) => void;
  onConnected: (response: SocketResponse<{playerId: string}>) => void;
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
  guessTime: 10000,
  songDuration: 2000,
  cooldownTime: 5000,



  startGame: () => {
    gameEmitterUseCase.emitStartGame();
  },
  emitGameConfig: ({ speed, duration }) => {
    gameEmitterUseCase.emitGameConfig({ speed, duration });
  },

  onStartGame: ({ data }) => {
    set((state) => ({ 
      ...state, 
      isGameStarted: true,
      guessTime: data.guessTime,
      songDuration: data.songDuration,
      cooldownTime: data.cooldownTime
    }));
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
    const orderedPlayers = data.players.sort((a, b) => b.score - a.score);
    set((state) => ({ ...state, players: orderedPlayers }));
  },
  onNewRound: ({ data }) => {
    set((state) => ({
      ...state,
      isRoundEnded: false,
      currentSong: data.currentSong,
      songs: data.songs,
      guess: null
    }));
    useTimerStore.getState().startGuessTimer(); // startTimer
    SongPlayerManager.playSong(data.currentSong); // playSong
  },
  onEndRound: ({ data }) => {
    set((state) => ({
      ...state,
      isRoundEnded: true,
      players: data.players
    }));
    useTimerStore.getState().startCooldownTimer(); // startTimer parcial

    const songDuration = useGameStore.getState().songDuration;
    
    if (songDuration !== null) {
      SongPlayerManager.resumeSongOnRoundEnded(); // resume current song without starting from the beginning or stopping
    }
  },
  onConnected: ({ data }) => {
    usePlayerStore.getState().setPlayerId(data.playerId);
  }
}));