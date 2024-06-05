import { useGuess } from "src/shared/hooks/useGuess"
import { Song } from "src/shared/model"
import { cn } from "src/shared/utils"



interface Props {
  song: Song
}

export default function Guess({ song }: Props) {
  const { guessSong, currentSong, isRoundEnded, guess } = useGuess()

  return (
    <div
      onClick={() => guessSong(song)}
      className={cn(`
        p-2
        md:p-3
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
        
        isRoundEnded && currentSong?.id !== song.id && guess?.id === song.id && 'border-4 border-red-500',
        
        // QUANDO DA O GUESS E AINDA N ACABOU O ROUND, NÃO SABE SE ESTÁ CERTO OU ERRADO
        !isRoundEnded && guess?.id === song.id && 'border-4 border-gray-400',
      )}
    >
      <p 
        className="
          text-white 
          font-bold 
          text-xl 
          mb-2

          truncate
          sm:line-clamp-2
          sm:text-wrap
        "
      >{song.name}</p>
      <p className="text-gray-400">{song.artists.join(', ')}</p>
    </div>
  )
}