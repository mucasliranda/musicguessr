'use client'

import { usePlayer } from "@/providers/player";
import { useSocket } from "@/providers/socket"
import Button from "@/shared/components/Button"
import Player from "@/shared/components/Player";



export default function Main() {

  const { songs } = useSocket();

  const { onPlay, setVolume } = usePlayer();

  return (
    <main 
      className="
        w-3/4 
        h-full

        p-4

        flex
        flex-col
        gap-8
      "
    >

      <Player />

      <div
        className="
          flex

          gap-4
        "
      >
        <Button
          onClick={onPlay}
        >
          Replay Song
        </Button>

        <Button>
          Skip
        </Button>

        <input type='range' min='0' max='100' onChange={(event) => setVolume(Number(event.target.value))} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

        {songs.length > 0 && songs.map(({ id, name }) => {
          return (
            <div key={id} className="bg-gray-800 rounded overflow-hidden shadow-lg p-4 cursor-pointer hover:bg-gray-700 transition duration-200">
              <div className="text-white font-bold text-xl mb-2">{name}</div>
              <p className="text-gray-400">Artist Name</p>
            </div>
          )
        })}

      </div>

    </main>
  )
}