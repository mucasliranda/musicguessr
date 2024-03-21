'use client'

import { useSocket } from "@/providers/socket";
import StartGameButton from "../../../lobby/components/StartGameButton";
import UserPhoto from "../../../lobby/components/UserPhoto";



export default function Aside() {

  const { players } = useSocket();

  return (
    <aside 
      className="
        w-1/4 
        h-full 
        p-4
        
        flex
        flex-col
        items-start
        bg-onBackground
      "
    >

      <h3 
        className="
          w-fit
          mb-6 
        
          text-white 
          text-lg
          border-b-[2px]
          border-primary
        "
      >
        Lobby
      </h3>

      <ul
        className="
          w-full

          mb-6

          flex
          flex-col
          gap-4
        "
      >
        {!!players && players.map((player) => {
          return (
            <li
              className="
                flex
                justify-between

                pb-1

                border-b-[1px]
                border-[#646464]
              "
              key={player.playerId}
            >
              <p
                className="text-white"
              >
                {player.playerId}
              </p>

              <UserPhoto />
            </li>
          )
        })}
      </ul>

      <StartGameButton />

    </aside>
  )
}
