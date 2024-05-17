'use client'

import { useGame } from "@/providers/game";
import { Button } from "@/shared/components/Button";



export default function StartGameButton() {
  const { onStartGame } = useGame();

  async function onClick() {
    onStartGame();
  }

  return (
    <Button
      onClick={onClick}
    >
      Start Game
    </Button>
  );
}