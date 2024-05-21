import useSongPlayer from "src/shared/hooks/useSongPlayer";

export default function SongPlayer() {
  const { onTimeUpdate } = useSongPlayer();
  
  return (
    <audio
      // ref={songPlayerRef}
      onTimeUpdate={onTimeUpdate}
      id="song-player"
    />
  )
}