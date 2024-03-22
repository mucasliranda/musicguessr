'use client'

import { useCookies } from 'next-client-cookies';
import { MutableRefObject, createContext, useContext, useEffect, useRef, useState } from 'react'
import { useSocket } from '../socket';



const PlayerContext = createContext({
  playerRef: null as unknown as MutableRefObject<HTMLAudioElement | null>,
  onPlay: () => {},
  onTimeUpdate: () => {},
  volume: 50,
  setVolume: (volume: number) => {}
});

export function PlayerProvider({ children }) {
  const { currentSong } = useSocket();

  const cookies = useCookies();

  const playerRef = useRef<HTMLAudioElement | null>(null);

  const [volume, _setVolume] = useState(50);

  function onPlay() {
    if (
      playerRef.current
      && currentSong  
    ) {
      const volume = getVolumeFromCookie();
      setVolume(volume);

      playerRef.current.currentTime = currentSong.startAt;

      playerRef.current.play();
    }
  }

  function onTimeUpdate() {
    if (
      playerRef.current 
      && currentSong  
      && playerRef.current.currentTime - currentSong.startAt > 1.5
    ) {
      playerRef.current.pause()
    }
  }

  function setVolume(volume: number) {
    _setVolume(volume);
    setVolumeOnCookie(volume);
    
    if (playerRef.current) {
      playerRef.current.volume = volume / 100;
    }
  }

  function setVolumeOnCookie(volume: number) {
    cookies.set('player-volume', volume.toString());
  }

  function getVolumeFromCookie() {
    const volume = cookies.get('player-volume');
    if (volume) {
      return Number(volume);
    }
    return 0.5;
  }

  useEffect(() => {
    const volume = getVolumeFromCookie();
    setVolume(volume);
  }, [])

  return (
    <PlayerContext.Provider value={{ playerRef, onPlay, onTimeUpdate, volume, setVolume }}>
      {children}
    </PlayerContext.Provider>
  )
}

export const usePlayer = () => useContext(PlayerContext);
