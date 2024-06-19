import { useGameStore } from "src/shared/store/client/game";
import { useWindowSize } from "@react-hook/window-size";
import Confetti from 'react-confetti'



export default function CongratulationsConfetti() {
  const [width, height] = useWindowSize();

  const {
    isRoundEnded,
    gameStatus,
    guess,
  } = useGameStore();
  
  return (
    <Confetti
      numberOfPieces={gameStatus === 'ended' || (isRoundEnded && gameStatus === 'playing' && guess?.right) ? 1000 : 0}
      recycle={false}
      gravity={0.15}
      onConfettiComplete={(confetti) => confetti?.reset()}
      width={width}
      height={height}
    />
  )
}