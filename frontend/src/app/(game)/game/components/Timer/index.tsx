import { useGame } from '@/providers/game';
import './styles.css'



export default function Timer() {
  const { progress, finished } = useGame();

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
