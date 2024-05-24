import { Button } from "src/shared/components/Button"
import Timer from "../Timer"
import SongVolume from "../SongVolume"
import { useGuess } from "src/shared/hooks/useGuess"
import { cn } from "src/shared/utils"
import { SongPlayerManager } from "src/shared/songPlayerManager"
import { useEffect } from "react"



export default function GuessArea() {
  const { songs, guessSong, currentSong, isRoundEnded, guess } = useGuess()

  useEffect(() => {
    console.log({ currentSong, isRoundEnded, guess })
  })

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

        {songs.length > 0 && songs.map((song) => {
          return (
            <div
              key={song.id}
              onClick={() => guessSong(song)}
              className={cn(
                `p-4 
                  overflow-hidden 
                  bg-gray-800 
                  rounded 
                  shadow-lg 
                  cursor-pointer 
                  hover:bg-gray-700 
                  transition 
                  duration-200
                  box-content
                  border-4 border-transparent`,

                isRoundEnded && currentSong?.id === song.id && 'border-4 border-green-500',
                guess !== null && isRoundEnded && currentSong?.id !== song.id && guess?.id === song.id && 'border-4 border-red-500',

                // QUANDO DA O GUESS E AINDA N ACABOU O ROUND, NÃO SABE SE ESTÁ CERTO OU ERRADO
                guess !== null && !isRoundEnded && guess?.id === song.id && 'border-4 border-gray-400',
              )}
            >
              <div className="text-white font-bold text-xl mb-2">{song.name}</div>
              <p className="text-gray-400">Artist Name</p>
            </div>
          )
        })}

      </div>

    </main>
  )
}