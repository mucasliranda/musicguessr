import { Player } from "src/shared/model"
import { cn } from "src/shared/utils";
import { usePlayerStore } from "src/shared/store/client/player"



interface Props {
  player: Player
}

export default function InLobbyPlayer({ player }: Props) {
  const playerId = usePlayerStore((state) => state.id);

  return (
    <li
      className={cn(`
        flex
        justify-between

        pb-1

        border-b-[1px]
      `,
        playerId === player.id ? "border-primary" : "border-[#646464]"
      )}
    >
      <p
        className="
          text-white
        "
      >
        {player.name}
      </p>

      <UserImage />
    </li>
  )
}

function UserImage() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path className="text-white" fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
    </svg>
  )
}