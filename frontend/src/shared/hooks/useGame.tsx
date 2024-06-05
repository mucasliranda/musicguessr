import { useEffect } from "react"
import { GameListenersUseCase } from "../useCases/gameUseCases/GameListenersUseCase"
import { SocketSingleton } from "../repositories/socketClient"
import { useParams } from "react-router-dom"
import { usePlayerStore } from "../zustand/player"
import { useGameStore } from "../zustand/game"



const gameListenersUseCase = new GameListenersUseCase(
  SocketSingleton.getSocket()
)

export function useGame() {
  const params = useParams()

  const {
    isGameStarted,
    startGame,
    onStartGame,
    onChangePlayers,
    onNewRound,
    onEndRound,
    onConnected
  } = useGameStore()

  const { 
    connect
  } = usePlayerStore()
  
  useEffect(() => {
    connect(params.gameId || '')

    gameListenersUseCase.setOnChangePlayersCallback((e) => onChangePlayers(e));

    gameListenersUseCase.setOnGameStartCallback((e) => onStartGame(e))

    gameListenersUseCase.setOnNewRoundCallback((e) => onNewRound(e))

    gameListenersUseCase.setOnEndRoundCallback((e) => onEndRound(e))

    gameListenersUseCase.setOnConnectedCallback((e) => onConnected(e))

    return () => {
      gameListenersUseCase.offAllListeners()
    }
  }, [])
  
  return {
    startGame,
    isGameStarted
  }
}