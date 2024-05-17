'use client'

import { Button } from "@/shared/components/Button"
import LinearTimer from "../Timer";
import { useGame } from "@/providers/game";
import { cn } from "@/shared/utils";
import ConfettiExplosion from 'react-confetti-explosion';



export default function Main() {
  const { songs, onGuessSongs, guess, playSong, volume, setVolume, roundEnded, currentSong, confetti, toggleConfetti } = useGame();


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
      <LinearTimer />

      <div
        className="
          flex

          gap-4
        "
      >
        <Button
          onClick={() => playSong()}
        >
          Replay Song
        </Button>

        <input 
          type='range' 
          value={volume} 
          min='0' 
          max='100' 
          onChange={(event) => setVolume(Number(event.target.value))} 
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

        {confetti && <ConfettiExplosion onComplete={toggleConfetti} />}

        {songs.length > 0 && songs.map((song) => {
          return (
            <div 
              key={song.id} 
              onClick={() => onGuessSongs(song)}
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

                roundEnded && currentSong?.id === song.id && 'border-4 border-green-500',
                guess !== null && roundEnded && currentSong?.id !== song.id && guess?.id === song.id && 'border-4 border-red-500',
              
                // QUANDO DA O GUESS E AINDA N ACABOU O ROUND, NÃO SABE SE ESTÁ CERTO OU ERRADO
                guess !== null && !roundEnded && guess?.id === song.id && 'border-4 border-gray-400',
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