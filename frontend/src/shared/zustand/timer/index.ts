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
  startGuessTimer: () => void;
  startCooldownTimer: () => void;

  startTimer: (duration: number) => void;
}

let timer: NodeJS.Timeout;
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
  startGuessTimer() {
    return this.startTimer(useGameStore.getState().guessTime);
  },
  startCooldownTimer() {
    return this.startTimer(useGameStore.getState().cooldownTime);
  },

  startTimer: (duration) => set((state) => {
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