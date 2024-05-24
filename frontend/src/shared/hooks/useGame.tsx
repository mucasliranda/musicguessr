import { useEffect } from "react"
import { GameListenersUseCase } from "../useCases/gameUseCases/GameListenersUseCase"
import { SocketSingleton } from "../socketClient"
import { useParams } from "react-router-dom"
import { usePlayerStore } from "../zustand/player"
import { useGameStore } from "../zustand/game"



const gameListenersUseCase = new GameListenersUseCase(
  SocketSingleton.getSocket()
)

export function useGame() {
  const params = useParams()

  const connect = usePlayerStore(state => state.connect)
  const startGame = useGameStore(state => state.startGame)
  const onStartGame = useGameStore(state => state.onStartGame)
  const onChangePlayers = useGameStore(state => state.onChangePlayers)
  const onNewRound = useGameStore(state => state.onNewRound)
  const onEndRound = useGameStore(state => state.onEndRound)
  
  useEffect(() => {
    connect(params.gameId || '')

    gameListenersUseCase.setOnChangePlayersCallback((e) => onChangePlayers(e));

    gameListenersUseCase.setOnGameStartCallback(() => onStartGame())

    gameListenersUseCase.setOnNewRoundCallback((e) => onNewRound(e))

    gameListenersUseCase.setOnEndRoundCallback((e) => onEndRound(e))

    return () => {
      gameListenersUseCase.offAllListeners()
    }
  }, [])
  
  return {
    startGame
  }
}