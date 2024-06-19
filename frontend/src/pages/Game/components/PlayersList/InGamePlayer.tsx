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

        lg:rounded-none
        lg:min-h-fit
        lg:min-w-0
        lg:border-b-[1px]
        lg:pb-1
        lg:flex-row
        lg:bg-transparent
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