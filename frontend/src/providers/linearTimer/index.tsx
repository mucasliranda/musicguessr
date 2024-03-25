
'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useSocket } from '../socket';



const LinearTimerContext = createContext({
  progress: 100,
  finished: false,
  startTimer: () => {},  
  endTimer: () => {},
});

const guessTime = 10000; // 5 SECS
const interval = 50;
let timer: NodeJS.Timeout;

export function LinearTimerProvider({ children }) {
  const [progress, setProgress] = useState(100);
  const [finished, setFinished] = useState(false);

  const { onTimedOut, currentSong } = useSocket();

  async function onFinished() {
    setFinished(true);
    onTimedOut();
    console.log('ACABOU O TIMER')
  }

  function startTimer() {
    console.log('INICIANDO TIMER')
    resetTimer();
    timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 0) {
          clearInterval(timer);
          onFinished();
          return 0;
        }
        const diff = (interval / guessTime) * 100; // Calculate the percentage to decrease for each 100ms
        return Math.max(oldProgress - diff, 0);
      });
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }

  function endTimer() {
    console.log('TIMER FOI FORÇADO A FINALIZAR')
    clearInterval(timer);
    onFinished();
  }

  function resetTimer() {
    console.log('RESETANDO TIMER')
    clearInterval(timer);
    setProgress(100);
    setFinished(false);
  }

  useEffect(() => {
    console.log('DENTRO DO USEEFFECT')
    if (!!currentSong) {
      startTimer();
    }
  }, [currentSong]);

  return (
    <LinearTimerContext.Provider value={{
      progress,
      finished,
      startTimer,
      endTimer,
    }}>
      {children}
    </LinearTimerContext.Provider>
  )
}

// Hook
export const useLinearTimer = () => useContext(LinearTimerContext);