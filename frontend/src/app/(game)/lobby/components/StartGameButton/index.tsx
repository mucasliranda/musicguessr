'use client'

import { useSocket } from "@/providers/socket";
import Button from "@/shared/components/Button";



export default function StartGameButton() {
  const { onStartGame } = useSocket();

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