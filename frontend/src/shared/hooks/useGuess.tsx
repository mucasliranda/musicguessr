import { SongPlayerManager } from "../songPlayerManager"
import { useGameStore } from "../zustand/game"



export function useGuess() {
  const songs = useGameStore(state => state.songs)
  const guessSong = useGameStore(state => state.guessSong)
  const currentSong = useGameStore(state => state.currentSong)
  const isRoundEnded = useGameStore(state => state.isRoundEnded)
  const guess = useGameStore(state => state.guess)

  function playCurrentSong() {
    if (currentSong) {
      SongPlayerManager.playSong(currentSong)
    }
  }

  return {
    songs,
    guessSong,
    currentSong,
    isRoundEnded,
    guess,
    playCurrentSong
  }
}