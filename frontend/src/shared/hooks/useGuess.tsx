import { useGameStore } from "../zustand/game"



export function useGuess() {
  const songs = useGameStore(state => state.songs)
  const guessSong = useGameStore(state => state.guessSong)
  const currentSong = useGameStore(state => state.currentSong)
  const isRoundEnded = useGameStore(state => state.isRoundEnded)
  const guess = useGameStore(state => state.guess)

  return {
    songs,
    guessSong,
    currentSong,
    isRoundEnded,
    guess
  }
}