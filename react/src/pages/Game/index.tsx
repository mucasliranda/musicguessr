import { useDispatch } from "react-redux";
import Aside from "./components/Aside";
import PlayersList from "./components/PlayersList";
import SongPlayer from "./components/SongPlayer";
import GameLayout from "./layout";
import { changeColor } from "src/shared/redux/songPlayer";



export default function GamePage() {
  const isGameStarted = false;

  const dispatch = useDispatch()

  return (
    <GameLayout>
      <Aside>
        
        {/* <button onClick={playSong}>Play</button>
        <button onClick={pauseSong}>Pause</button>
        <button onClick={loadSong}>Load</button> */}

        <button onClick={() => {
          dispatch(changeColor())
        }}>Change color</button>

        <p id="paragraph">paragraph</p>

        <PlayersList players={[]} />
      </Aside>

      {/* <SongPlayer /> */}
    </GameLayout>
  )
}