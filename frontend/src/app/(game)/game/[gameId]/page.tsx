'use client'

import { useSocket } from "@/providers/socket";
import ScoreAside from "../components/Aside";
import LobbyAside from "../../lobby/components/Aside";
import Songs from "../components/Main";
import Lobby from "../../lobby/components/Main";



export default function Game() {

  const { isGameStarted } = useSocket();

  return (
    <div className="w-full max-w-screen-2xl h-screen flex">
      {isGameStarted ? <ScoreAside /> : <LobbyAside />}

      {isGameStarted ? <Songs /> : <Lobby />}
    </div>
  )
}