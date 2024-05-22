import { configureStore } from '@reduxjs/toolkit'
import gameReducer from './game'
import songPlayerReducer from './songPlayer'
import playerReducer from './player'

export default configureStore({
  reducer: {
    game: gameReducer,
    songPlayer: songPlayerReducer,
    player: playerReducer
  }
})