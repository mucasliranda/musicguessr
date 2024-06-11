import { cn } from "src/shared/utils"
import InGamePlayer from "./InGamePlayer"
import InLobbyPlayer from "./InLobbyPlayer"
import { useGameStore } from "src/shared/store/client/game"



interface Props {
  orientation: "row" | "col" 
}

export default function PlayersList({ orientation }: Props) {
  const isGameStarted = useGameStore((state) => state.isGameStarted)
  const players = useGameStore((state) => state.players)

  const DynamicPlayerComponent = isGameStarted ? InGamePlayer : InLobbyPlayer
  const DynamicList = orientation === "row" ? RowList : ColList

  return (
    <DynamicList
      isGameStarted={isGameStarted}
    >
      {players.map((player) => {
        return (
          <DynamicPlayerComponent
            player={player}
            key={player.id}
          />
        )
      })}
    </DynamicList>
  )
}

function RowList({ children, isGameStarted }) {
  return (
    <ul
      className={cn(`
        w-full
        min-h-[65px]

        flex-row 
        gap-1
        
        overflow-x-scroll
        no-scrollbar
        
        md:hidden`,
        isGameStarted ? "flex" : "hidden"
      )}
    >
      {children}
    </ul>
  )
}

function ColList({ children }) {
  return (
    <ul
      className="
        w-full

        flex
        flex-col
        gap-3
        
        flex-grow-0

        overflow-y-auto
      "
    >
      {children}
    </ul>
  )
}