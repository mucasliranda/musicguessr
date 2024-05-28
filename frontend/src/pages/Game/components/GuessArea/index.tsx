import { Button } from "src/shared/components/Button"
import Timer from "../Timer"
import SongVolume from "../SongVolume"
import { useGuess } from "src/shared/hooks/useGuess"
import { SongPlayerManager } from "src/shared/songPlayerManager"
import Guess from "./Guess"



export default function GuessArea() {
  const { songs } = useGuess()

  return (
    <main
      className="
        w-3/4 
        h-full

        p-4
        pt-8

        flex
        flex-col
        gap-8
        relative
      "
    >
      <Timer />

      <div
        className="
          flex
          gap-4
        "
      >
        <Button
          onClick={() => {
            SongPlayerManager.replaySong()
          }}
        >
          Replay Song
        </Button>

        <SongVolume />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

        {songs.length > 0 && songs.map((song) => <Guess song={song} key={song.id} />)}

      </div>

    </main>
  )
}