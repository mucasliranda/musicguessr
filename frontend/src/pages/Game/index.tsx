import { useSelector } from "react-redux";
import Aside from "./components/Aside";
import PlayersList from "./components/PlayersList";
import SongPlayer from "./components/SongPlayer";
import GameLayout from "./layout";
import { useGame } from "src/shared/hooks/useGame";
import { Button } from "src/shared/components/Button";
import Lobby from "./components/Lobby";
import GuessArea from "./components/GuessArea";
import { useGameStore } from "src/shared/zustand/game";



export default function GamePage() {
  const isGameStarted = useGameStore((state) => state.isGameStarted);

  const { startGame } = useGame();

  return (
    <GameLayout>
      <Aside>
        <PlayersList />

        {!isGameStarted && (
          <Button
            onClick={startGame}
          >
            Start Game
          </Button>
        )}
      </Aside>

        {!isGameStarted ? <Lobby /> : <GuessArea />}

      <SongPlayer />
    </GameLayout>
  )
}