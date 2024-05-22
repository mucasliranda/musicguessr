import { useDispatch } from "react-redux";
import Aside from "./components/Aside";
import PlayersList from "./components/PlayersList";
import SongPlayer from "./components/SongPlayer";
import GameLayout from "./layout";
import { SongPlayerManager } from "src/shared/songPlayerManager";
import { useEffect } from "react";
import { useGame } from "src/shared/hooks/useGame";



export default function GamePage() {
  const {} = useGame()

  const isGameStarted = false;

  return (
    <GameLayout>
      <Aside>
        
        {/* <button onClick={SongPlayerManager.playSong}>Play</button>
        <button onClick={SongPlayerManager.pauseSong}>Pause</button> */}
        {/* <button onClick={loadSong}>Load</button> */}

        <PlayersList players={[]} />
      </Aside>

      <SongPlayer />
    </GameLayout>
  )
}