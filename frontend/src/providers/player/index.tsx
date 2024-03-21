'use client'

import { useCookies } from 'next-client-cookies';
import React, { MutableRefObject, createContext, useContext, useEffect, useRef } from 'react'



const PlayerContext = createContext({
  playerRef: null as unknown as MutableRefObject<HTMLAudioElement | null>,
  onPlay: () => {},
  setVolume: (volume: number) => {}
});

export function PlayerProvider({ children }) {
  const playerRef = useRef<HTMLAudioElement | null>(null);

  const cookies = useCookies();

  function onPlay() {
    if (playerRef.current) {
      playerRef.current.play()
    }
  }

  function setVolume(volume: number) {
    if (playerRef.current) {
      playerRef.current.volume = volume / 100;
      setVolumeOnCookie(volume);
    }
  }

  function setVolumeOnCookie(volume: number) {
    cookies.set('player-volume', volume.toString());
  }

  function getVolumeFromCookie() {
    const volume = cookies.get('player-volume');
    if (volume) {
      return parseFloat(volume);
    }
    return 100;
  }

  useEffect(() => {
    console.log('rodando o useEffect do volume')
    const volume = getVolumeFromCookie();
    setVolume(volume);
  }, [])

  return (
    <PlayerContext.Provider value={{ playerRef, onPlay, setVolume }}>
      {children}
    </PlayerContext.Provider>
  )
}

export const usePlayer = () => useContext(PlayerContext);
