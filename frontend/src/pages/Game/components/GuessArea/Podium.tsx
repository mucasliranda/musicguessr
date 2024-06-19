import { useGameStore } from "src/shared/store/client/game"



export default function Podium() {
  const players = useGameStore(state => state.players)
  
  return (
    <div
      className="
        w-full
        h-full
        overflow-y-auto
      "
    >
      {[...players].sort((a, b) => b.score - a.score).slice(0, 3).map((player, index) => (
        <div
          key={player.id}
          className="
            w-full
            h-16
            flex
            items-center
            justify-between
            p-4
          "
        >
          <span>{index + 1}</span>
          <span>{player.name}</span>
          <span>{player.score}</span>
        </div>
      ))}
    </div>
  )
}