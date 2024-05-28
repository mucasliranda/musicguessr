import { useGameStore } from "src/shared/zustand/game"
import InGamePlayer from "./InGamePlayer"
import InLobbyPlayer from "./InLobbyPlayer"



export default function PlayersList() {
  const isGameStarted = useGameStore((state) => state.isGameStarted)
  const players = useGameStore((state) => state.players)

  const DynamicPlayerComponent = isGameStarted ? InGamePlayer : InLobbyPlayer

  return (
    <ul
      className="
        w-full

        mb-6

        flex
        flex-col
        gap-4
      "
    >
      {players.map((player) => {
        return (
          <DynamicPlayerComponent
            player={player}
            key={player.id}
          />
        )
      })}
    </ul>
  )
}