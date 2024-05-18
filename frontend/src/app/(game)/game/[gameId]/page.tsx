'use client'

import { useGame } from "@/providers/game";
import ScoreAside from "../components/Aside";
import Songs from "../components/Main";
import Lobby from "../components/Lobby";
import { LobbyAside } from "../components/LobbyAside";
import SongPlayer from "@/shared/components/SongPlayer";
import { useParams } from "next/navigation";
import { useEffect } from "react";



export default function Game() {
  const { gameId } = useParams();

  const { isGameStarted, setGameId } = useGame();

  useEffect(() => {
    if (gameId) {
      setGameId(gameId.toString());
    }
  }, [gameId])

  return (
    <div className="w-full max-w-screen-2xl h-screen flex">
      {isGameStarted ? <ScoreAside /> : <LobbyAside />}

      {isGameStarted ? <Songs /> : <Lobby />}

      <SongPlayer />
    </div>
  )
}