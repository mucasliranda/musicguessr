import { useGameStore } from "src/shared/store/client/game"
import GameConfigDialog from "../GameConfigDialog"
import { cn } from "src/shared/utils"



interface Props {
  children: React.ReactNode
}

export default function Aside({ children }: Props) {
  const isGameStarted = useGameStore((state) => state.isGameStarted)

  return (
    <aside
      className={cn(`
        w-full
        max-w-[25%]
        min-w-40
        h-full 
        p-4
        
        hidden

        md:flex
        flex-col
        items-start
        bg-onBackground`,
        !isGameStarted && '!flex'
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
          {isGameStarted ? 'Score' : 'Lobby'}
        </h3>

        {!isGameStarted && (
          <GameConfigDialog />
        )}
      </div>
      {children}
    </aside>
  )
}