import { create } from "zustand";
import { uniqueNamesGenerator, colors, adjectives, animals, Config } from 'unique-names-generator';
import { GameEmitterUseCase } from "src/shared/useCases/gameUseCases/GameEmitterUseCase";
import { SocketSingleton } from "src/shared/repositories/socketClient";



function generateRandomName() {
  const customConfig: Config = {
    dictionaries: [colors, adjectives, animals],
    separator: '-',
    length: 3,
  };

  return uniqueNamesGenerator(customConfig)
}

type State = {
  name: string;
  id: string | null;
}

type Actions = {
  connect: (gameId: string) => void;
  setPlayerId: (id: string) => void;
}

const gameEmitterUseCase = new GameEmitterUseCase(
  SocketSingleton.getSocket()
);

export const usePlayerStore = create<State & Actions>((set) => ({
  name: generateRandomName(),
  id: null,
  connect: (gameId) => {
    const player = {
      gameId: gameId,
      username: generateRandomName()
    }

    gameEmitterUseCase.emitConnect(player);
  },
  setPlayerId: (id) => {
    set((state) => ({
      ...state,
      id
    }))
  }
}));
