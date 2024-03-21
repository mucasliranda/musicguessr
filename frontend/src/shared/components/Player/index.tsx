'use client';

import { usePlayer } from "@/providers/player";
import { useSocket } from "@/providers/socket";



export default function Player() {
  const { currentSong } = useSocket();
  
  if(!!currentSong) {
    
    const { playerRef } = usePlayer();
    
    const { startAt, url } = currentSong;

    return (
      <div>
        <audio
          ref={playerRef}
          onPlay={() => {
            if (playerRef.current) {
              playerRef.current.currentTime = startAt
            }
          }}
          onTimeUpdate={() => {
            if (playerRef.current) {
              if (playerRef.current.currentTime - startAt > 1.5) {
                playerRef.current.pause()
              }
            }
          }}
          src={url}
          autoPlay
        />
      </div>
    )
  }

  return (<></>)
}