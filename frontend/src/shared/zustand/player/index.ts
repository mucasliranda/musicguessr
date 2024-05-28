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
}

type Actions = {
  connect: (gameId: string) => void;
}

const gameEmitterUseCase = new GameEmitterUseCase(
  SocketSingleton.getSocket()
);

export const usePlayerStore = create<State & Actions>(() => ({
  name: generateRandomName(),
  connect: (gameId) => {
    const player = {
      gameId: gameId,
      username: generateRandomName()
    }

    console.log('conectando')

    gameEmitterUseCase.emitConnect(player);
  },
}));
