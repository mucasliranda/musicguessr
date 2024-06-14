import Aside from "./components/Aside";
import SongPlayer from "./components/SongPlayer";
import GameLayout from "./layout";
import { useGame } from "src/shared/hooks/useGame";
import { Button } from "src/shared/components/Button";
import Lobby from "./components/Lobby";
import GuessArea from "./components/GuessArea";
import PlayersList from "./components/PlayersList";



export default function GamePage() {
  const { startGame, gameStatus } = useGame();

  return (
    <GameLayout>
      <Aside>
        <PlayersList orientation="col" />

        {gameStatus === 'waiting' && (
          <Button
            onClick={startGame}
            className="mt-4"
          >
            Start Game
          </Button>
        )}
      </Aside>

      {gameStatus === 'waiting' ? <Lobby /> : <GuessArea />}

      <SongPlayer />
    </GameLayout>
  )
}