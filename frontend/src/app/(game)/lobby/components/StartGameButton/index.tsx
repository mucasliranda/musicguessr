'use client'

import Button from "@/shared/components/Button";
import { useParams, useRouter } from "next/navigation";


export default function StartGameButton() {
  const { lobbyId } = useParams();
  const router = useRouter();

  async function onStartGame() {
    router.push(`/game/${lobbyId}`);
  }

  return (
    <Button
      onClick={onStartGame}
    >
      Start Game
    </Button>
  );
}