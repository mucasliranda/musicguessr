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
  startGuessTimer: () => Promise<void>;
  startCooldownTimer: () => Promise<void>;
  startEndGameTimer: () => Promise<void>;

  startTimer: (duration: number) => Promise<void>;
}

let timer: NodeJS.Timeout;
const timerInterval = 50;

export const useTimerStore = create<State & Actions>((set) => ({
  progress: 100,
  finished: false,
  finishTimer: () => {
    set(() => ({ finished: true }));
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
  async startGuessTimer() {
    return await this.startTimer(useGameStore.getState().roundDuration);
  },
  async startCooldownTimer() {
    return await this.startTimer(useGameStore.getState().cooldownTime);
  },
  async startEndGameTimer() {
    return await this.startTimer(10000);
  },

  startTimer: async (duration) => {
    const state = useTimerStore.getState();
    let progress = state.resetTimer().progress;

    return await new Promise((resolve) => {
      timer = setInterval(() => {
        if (progress === 0) {
          clearInterval(timer);
          state.finishTimer();
          resolve();
        }
        const diff = (timerInterval / duration) * 100;
        const newProgress = Math.max(progress - diff, 0);
        progress = newProgress;
        state.setProgress(newProgress);
      }, timerInterval);
    });
  }
}))