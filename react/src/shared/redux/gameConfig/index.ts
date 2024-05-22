import { createSlice } from "@reduxjs/toolkit";



export interface GameConfigState {
  gameId: string | null;

}

const initialState: GameConfigState = {
  gameId: null,
};

export const gameConfigSlice = createSlice({
  name: 'gameConfig',
  initialState,
  reducers: {

  }
});

export default gameConfigSlice.reducer;
