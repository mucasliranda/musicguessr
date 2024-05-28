import { create } from 'zustand'
import { useGameStore } from '../game';



type State = {
  progress: number;
  finished: boolean;
}

type Actions = {
  finishTimer: () => void;
  setProgress: (progress: number) => void;
  resetTimer: () => { progress: number };
  startTimer: (duration?: number) => void;
}

let timer: NodeJS.Timeout;
const guessDuration = 10000; // 10 SECS
const timerInterval = 50;

export const useTimerStore = create<State & Actions>((set) => ({
  progress: 100,
  finished: false,
  finishTimer: () => {
    useGameStore.getState().timedOut();
    set(() => ({ finished: true }))
  },
  setProgress: (progress) => set(() => ({ progress })),
  resetTimer: () => {
    clearInterval(timer)
    const newProgress = 100;
    const newFinished = false;
    set((state) => {
      state.progress = newProgress;
      state.finished = newFinished;
      return state
    })

    return { progress: newProgress }
  },
  startTimer: (duration = guessDuration) => set((state) => {
    let progress = state.resetTimer().progress;
    
    timer = setInterval(() => {
      if (progress === 0) {
        clearInterval(timer);
        state.finishTimer();
        return { progress: 0, finished: true }; // Return the updated state
      }
      const diff = (timerInterval / duration) * 100;
      const newProgress = Math.max(progress - diff, 0);
      progress = newProgress;
      state.setProgress(newProgress);
      return { finished: false, progress: newProgress }; // Return the updated state
    }, timerInterval);
    
    return state
  })
}))