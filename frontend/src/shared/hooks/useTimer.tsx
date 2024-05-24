import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { finishTimer, resetProgress, resetTimer, setProgress, unfinishTimer } from "../redux/timer";



let timer: NodeJS.Timeout;
const guessDuration = 10000; // 10 SECS
const timerInterval = 50;

export function useTimer() {
  const progress = useSelector((state: RootState) => state.timer.progress);
  const finished = useSelector((state: RootState) => state.timer.finished);

  const dispatch = useDispatch();

  function startTimer() {
    dispatch(resetTimer());
    timer = setInterval(() => {
      let oldProgress = progress;
      
      const _ = (() => {
        if (oldProgress === 0) {
          clearInterval(timer);
          dispatch(finishTimer());
          return 0;
        }
        const diff = (timerInterval / guessDuration) * 100; // Calculate the percentage to decrease for each 100ms
        return Math.max(oldProgress - diff, 0);
      })();

      dispatch(setProgress(_));
    }, timerInterval);

    // return () => {
    //   clearInterval(timer);
    // };
  }

  return {
    startTimer
  }
}