import useSongPlayer from "src/shared/hooks/useSongPlayer";
import Aside from "./components/Aside";
import PlayersList from "./components/PlayersList";
import SongPlayer from "./components/SongPlayer";
import GameLayout from "./layout";



export default function GamePage() {
  const isGameStarted = false;

  const { playSong, pauseSong, loadSong } = useSongPlayer();

  return (
    <GameLayout>
      <Aside>
        
        <button onClick={playSong}>Play</button>
        <button onClick={pauseSong}>Pause</button>
        <button onClick={loadSong}>Load</button>

        <PlayersList players={[]} />
      </Aside>

      <SongPlayer />
    </GameLayout>
  )
}