import { useTimerStore } from "src/shared/store/client/timer";



export default function Timer() {
  const progress = useTimerStore((state) => state.progress);
  const finished = useTimerStore((state) => state.finished);

  return (
    <div 
      className="
        w-full 
        h-4 
        absolute
        top-0
        left-0
      "
      >
      {!finished ? (
        <div
          className={`
            h-4
            bg-primary
            transition-all
            duration-250
          `}
          style={{ width: `${progress}%` }}
        />
      ): null}
    </div>
  );
}