import { configureStore } from '@reduxjs/toolkit'
import gameReducer from './game'
import songPlayerReducer from './songPlayer'

export default configureStore({
  reducer: {
    game: gameReducer,
    songPlayer: songPlayerReducer
  }
})