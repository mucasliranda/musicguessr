import { Player } from "src/shared/model"
import { cn } from "src/shared/utils"
import { usePlayerStore } from "src/shared/store/client/player";



interface Props {
  player: Player
}

export default function InGamePlayer({ player }: Props) {
  const playerId = usePlayerStore((state) => state.id);
  
  return (
    <li
      className={cn(`
        flex
        flex-col
        justify-between
        
        p-2
        rounded-md

        min-h-[65px]
        min-w-36

        border-b-[3px]
        bg-gray-800

        md:rounded-none
        md:min-h-fit
        md:min-w-0
        md:border-b-[1px]
        md:pb-1
        md:flex-row
        md:bg-transparent
      `,
        playerId === player.id ? "border-primary" : "border-[#646464]"
      )}
    >
      <p
        className="
          text-white
          truncate
          md:text-wrap
        "
      >
        {player.name}
      </p>

      <p
        className="
          text-white
          self-end
          md:self-auto
        "
      >
        {player.score}
      </p>
    </li>
  )
}