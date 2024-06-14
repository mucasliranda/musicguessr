import { useGameStore } from "src/shared/store/client/game"
import GameConfigDialog from "../GameConfigDialog"
import { cn } from "src/shared/utils"



interface Props {
  children: React.ReactNode
}

export default function Aside({ children }: Props) {
  const gameStatus = useGameStore((state) => state.gameStatus)

  return (
    <aside
      className={cn(`
        w-full
        min-w-40
        h-full 
        p-4
        
        hidden
        
        max-w-[40%]
        md:max-w-[25%]
        lg:flex
        flex-col
        items-start
        bg-onBackground`,
        gameStatus === 'waiting' && '!flex'
      )}
    >
      <div
        className="
          w-full
          h-fit
          flex
          justify-between

          mb-3
        "
      >
        <h3
          className="
            w-fit
          
            text-white 
            text-lg
            border-b-[2px]
            border-primary
          "
        >
          {gameStatus === 'waiting' ? 'Lobby' : 'Score'}
        </h3>

        {gameStatus === 'waiting' && (
          <GameConfigDialog />
        )}
      </div>
      {children}
    </aside>
  )
}