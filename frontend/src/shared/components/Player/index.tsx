'use client';

import { usePlayer } from "@/providers/player";
import { useSocket } from "@/providers/socket";



export default function Player() {
  const { currentSong } = useSocket();
  
  if(!!currentSong) {
    
    const { playerRef, onPlay, onTimeUpdate } = usePlayer();
    
    const { url } = currentSong;

    return (
      <div>
        <audio
          ref={playerRef}
          onPlay={onPlay}
          onTimeUpdate={onTimeUpdate}
          src={url}
          autoPlay
        />
      </div>
    )
  }

  return (<></>)
}