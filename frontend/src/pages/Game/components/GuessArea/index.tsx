import { Button } from "src/shared/components/Button"
import Timer from "../Timer"
import SongVolume from "../SongVolume"
import { useGuess } from "src/shared/hooks/useGuess"
import Guess from "./Guess"
import PlayersList from "../PlayersList"
import { useGameStore } from "src/shared/store/client/game"
import Podium from "./Podium"



export default function GuessArea() {
  const { songs, playCurrentSong } = useGuess()
  const gameStatus = useGameStore(state => state.gameStatus)

  return (
    <main
      className="
        w-full 
        h-full

        p-4
        pt-8

        flex
        flex-col
        gap-4
        md:gap-8
        relative
      "
    >
      <Timer />

      {gameStatus === 'playing' ? (
        <>
          <div
            className="
              flex
              gap-4
            "
          >
            <Button
              onClick={playCurrentSong}
            >
              Replay Song
            </Button>

            <SongVolume />
          </div>

          <PlayersList orientation="row" />

          <div 
            className="
              grid 
              grid-cols-1 
              sm:grid-cols-2 
              md:grid-cols-3 
              lg:grid-cols-4 
              gap-4

              overflow-auto
            "
          >
            {songs.length > 0 && songs.map((song) => <Guess song={song} key={song.id} />)}
          </div>
        </>
      ) : (
        <Podium />
      )}

    </main>
  )
}