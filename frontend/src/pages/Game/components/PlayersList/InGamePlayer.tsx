import { Player } from "src/shared/model"



interface Props {
  player: Player
}

export default function InGamePlayer({ player }: Props) {
  return (
    <li
      className="
        flex
        justify-between

        pb-1

        border-b-[1px]
        border-[#646464]
      "
    >
      <p
        className="text-white"
      >
        {player.name}
      </p>

      <p
        className="text-white"
      >
        {player.score}
      </p>
    </li>
  )
}