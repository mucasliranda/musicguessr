'use client';

import { useGame } from "@/providers/game";

export default function SongPlayer() {
  const { playerRef, onTimeUpdate } = useGame();
  
  return (
    <audio
      ref={playerRef}
      onTimeUpdate={onTimeUpdate}
    />
  )
}