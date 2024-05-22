import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SocketSingleton } from "src/shared/socketClient";
import { GameEmitterUseCase } from "src/shared/useCases/gameUseCases/GameEmitterUseCase";
import { uniqueNamesGenerator, colors, adjectives, animals, Config } from 'unique-names-generator';



function generateRandomName() {
  const customConfig: Config = {
    dictionaries: [colors, adjectives, animals],
    separator: '-',
    length: 3,
  };

  return uniqueNamesGenerator(customConfig)
}

export interface PlayerState {
  name: string;
}

const initialState: PlayerState = {
  name: generateRandomName()
};

const gameEmitterUseCase = new GameEmitterUseCase(
  SocketSingleton.getSocket()
);

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    connect: (state, action: PayloadAction<{gameId: string}>) => {
      const player = {
        gameId: action.payload.gameId,
        username: state.name
      }

      gameEmitterUseCase.emitConnect(player);
    },
  }
});

export const { connect } = playerSlice.actions;

export default playerSlice.reducer;
