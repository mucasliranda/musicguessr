import { useEffect } from "react"
import { GameListenersUseCase } from "../useCases/gameUseCases/GameListenersUseCase"
import { SocketSingleton } from "../socketClient"
import { useDispatch } from "react-redux"
import { connect } from "../redux/player"
import { useParams } from "react-router-dom"

const gameListenersUseCase = new GameListenersUseCase(
  SocketSingleton.getSocket()
)

export function useGame() {
  const params = useParams()

  const dispatch = useDispatch()
  
  useEffect(() => {

    console.log('useEffect');

    dispatch(
      connect({ gameId: params.gameId || '' })
    );

    // gameListenersUseCase.setOnPlayersChangeCallback();
    
  }, [])
  
  return {

  }
}