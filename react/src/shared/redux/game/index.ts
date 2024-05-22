import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Song } from "src/shared/model";
import { SocketSingleton } from "src/shared/socketClient";
import { GameEmitterUseCase } from "src/shared/useCases/gameUseCases/GameEmitterUseCase";



interface CurrentSong extends Song {
  startAt?: number
}

interface Guess extends Song {
  right?: boolean;
}

export interface GameState {
  players: Array<{
    id: string,
    name: string
  }>,
  gameId: string | null,
  songs: Array<Song>,
  currentSong: CurrentSong | null,
  isGameStarted: Boolean,
  guess: Guess | null,
  roundEnded: Boolean
}

const initialState: GameState = {
  players: [],
  gameId: null,
  songs: [],
  currentSong: null,
  isGameStarted: false,
  guess: null,
  roundEnded: false
};

const gameEmitterUseCase = new GameEmitterUseCase(SocketSingleton.getSocket());

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    connect: (_, action: PayloadAction<{gameId: string, username: string}>) => {
      const player = action.payload
      gameEmitterUseCase.emitConnect(player);
    },
    startGame: () => {
      gameEmitterUseCase.emitStartGame();
    },
    guessSong: (state, action: PayloadAction<Song>) => {
      if (!!!state.guess) {
        const songGuessed = action.payload;

        state.guess = {
          ...songGuessed,
          right: state.currentSong?.id === songGuessed.id
        };
        
        gameEmitterUseCase.emitGuessSong(songGuessed);
      }
    },
    timedOut: () => {
      gameEmitterUseCase.emitTimedOut();
    },
  }
});

export default gameSlice.reducer;
