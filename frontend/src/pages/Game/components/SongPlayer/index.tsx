import { SongPlayerManager } from "src/shared/songPlayerManager";



export default function SongPlayer() {
  
  return (
    <audio
      onTimeUpdate={SongPlayerManager.onTimeUpdate}
      id="song-player"
    />
  )
}