import { useEffect } from "react"
import { GameListenersUseCase } from "../useCases/gameUseCases/GameListenersUseCase"
import { SocketSingleton } from "../repositories/socketClient"
import { useNavigate, useParams } from "react-router-dom"
import { usePlayerStore } from "../store/client/player"
import { useGameStore } from "../store/client/game"



const gameListenersUseCase = new GameListenersUseCase(
  SocketSingleton.getSocket()
)

export function useGame() {
  const params = useParams()
  const navigate = useNavigate()

  const {
    gameStatus,
    startGame,
    onStartGame,
    onEndGame,
    onChangePlayers,
    onNewRound,
    onEndRound,
    onGameJoined
  } = useGameStore()

  const { 
    joinGame
  } = usePlayerStore()
  
  useEffect(() => {
    joinGame(params.gameId || '')

    gameListenersUseCase.setOnChangePlayersCallback((e) => onChangePlayers(e));

    gameListenersUseCase.setOnGameStartCallback((e) => onStartGame(e))

    gameListenersUseCase.setOnNewRoundCallback((e) => onNewRound(e))

    gameListenersUseCase.setOnEndRoundCallback((e) => onEndRound(e))

    gameListenersUseCase.setOnGameJoinedCallback((e) => onGameJoined(e))

    gameListenersUseCase.setOnGameNotFoundCallback(() => navigate('/'))

    gameListenersUseCase.setOnEndGameCallback((e) => onEndGame(e))

    return () => {
      gameListenersUseCase.offAllListeners()
    }
  }, [])
  
  return {
    startGame,
    gameStatus
  }
}