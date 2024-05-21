import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";



interface State {
  songSrc: string | null;
  currentTime: number;
  songPlayer: HTMLAudioElement;
}

let memoryState: State = {
  songSrc: null,
  currentTime: 0,
  songPlayer: document.getElementById('song-player') as HTMLAudioElement
};

const listeners: Array<(state: State) => void> = [];
// const listeners = [];

export default function useSongPlayer() {
  const [state, setState] = useState(memoryState);

  useEffect(() => {
    listeners.push(setState);
    return () => {
      listeners.splice(listeners.indexOf(setState), 1);
    };
  }, []);

  useEffect(() => {
    console.log(state.songPlayer.)
  }, [])

  function onTimeUpdate() {
    // state.songPlayer.on

    // if (songPlayerRef.current) {
    //   console.log('onTimeUpdate', songPlayerRef.current.currentTime);
    //   memoryState = { ...memoryState, currentTime: songPlayerRef.current.currentTime };
    //   listeners.forEach(listener => listener(memoryState));
    // }





    // if (
    //   songPlayerRef.current
    // ) {
    //   console.log('onTimeUpdate', songPlayerRef.current.currentTime)
    // }

    // if (songPlayerRef.current) {
    //   console.log('onTimeUpdate', songPlayerRef.current.currentTime);
    //   memoryState.currentTime = songPlayerRef.current.currentTime;
    //   listeners.forEach(listener => listener(memoryState));
    // }

    // if (
    //   playerRef.current
    //   && currentSong
    //   && playerRef.current.currentTime - currentSong.startAt > 1.5
    // ) {
    //   playerRef.current.pause()
    // }
  }

  function playSong() {
    // if (songPlayerRef.current) {
    //   songPlayerRef.current.play();
    //   memoryState = { ...memoryState };
    //   listeners.forEach(listener => listener(memoryState));
    // }
    state.songPlayer.play();
    listeners.forEach(listener => listener(memoryState));
  }

  function pauseSong() {
    // if (songPlayerRef.current) {
    //   songPlayerRef.current.pause();
    //   memoryState = { ...memoryState };
    //   listeners.forEach(listener => listener(memoryState));
    // }
  }

  function loadSong() {
    const src = "https://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg"

    console.log('loading song')

    state.songPlayer.src = src;

    listeners.forEach(listener => listener(memoryState));

    // if (songPlayerRef.current) {
    //   // Carregar a música aqui
    //   songPlayerRef.current.src = src;
    //   songPlayerRef.current.load();
    //   memoryState = { ...memoryState, songSrc: src};
    //   listeners.forEach(listener => listener(memoryState));
    // }
  }

  // useEffect(() => {
  //   console.log('songPlayerRef', songPlayerRef)
  // }, [songPlayerRef])

  useEffect(() => {
    listeners.push(setState);
    return () => {
      listeners.splice(listeners.indexOf(setState), 1);
    };
  }, []);

  return {
    onTimeUpdate,
    playSong,
    pauseSong,
    loadSong
  }
}