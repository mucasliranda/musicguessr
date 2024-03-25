import './styles.css'
import { useLinearTimer } from "@/providers/linearTimer";



export default function LinearTimer() {

  const { progress, finished } = useLinearTimer();

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
      ): (
        <div
          className={`
            w-full
            h-4
            bg-red-400
          `}
        />
      )}
    </div>
  );
}
