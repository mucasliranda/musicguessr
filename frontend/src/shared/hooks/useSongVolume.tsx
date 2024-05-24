import { useState } from "react"
import Cookies from 'js-cookie'
import { SongPlayerManager } from "../songPlayerManager";



export function useSongVolume() {
  const [volume, setVolume] = useState(getVolumeFromCookie())

  function changeVolume(newVolume: number) {
    setVolume(newVolume);
    Cookies.set('song-volume', newVolume.toString());
    SongPlayerManager.setVolume(newVolume);
  }

  function getVolumeFromCookie() {
    const newVolume = Cookies.get('song-volume');
    if (newVolume) {
      return Number(newVolume);
    }
    return 50;
  }

  return {
    changeVolume,
    volume
  }
}