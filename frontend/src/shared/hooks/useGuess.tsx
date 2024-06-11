import { SongPlayerManager } from "../songPlayerManager"
import { useGameStore } from "../store/client/game"



export function useGuess() {
  const {
    songs,
    guessSong,
    currentSong,
    isRoundEnded,
    guess
  } = useGameStore()

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