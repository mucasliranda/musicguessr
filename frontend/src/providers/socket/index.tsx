'use client'

import { Player, Song } from '@/shared/model';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client';



interface SocketData<T> {
  event: string;
  data: T;
}

interface CurrentSong extends Song {
  startAt: number;
}

// Criação do contexto
const SocketContext = createContext({
  players: [] as Array<Player>,
  onStartGame: () => {},
  songs: [] as Array<Song>,
  isGameStarted: false,
  currentSong: null as Song & {startAt: number} | null
});


// Provider
export function SocketProvider({ children }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [players, setPlayers] = useState<Array<Player>>([]);
  const [songs, setSongs] = useState<Array<Song>>([]);
  const [currentSong, setCurrentSong] = useState<Song & {startAt: number} | null>(null);
  const [isGameStarted, setIsGameStarted] = useState(false);

  useEffect(() => {
    const newSocket = io('http://localhost:3005'); // Substitua com a URL do seu servidor
    setSocket(newSocket);

    newSocket.connect();

    newSocket.on('players', onChangePlayers)

    newSocket.on('startGame', onReceiveStartGame)

    newSocket.on('newRound', onNewRound)

    // return () => {
    //   newSocket.disconnect();
    //   newSocket.off('players', onChangePlayers);
    // }
  }, []);

  function onChangePlayers(players) {
    setPlayers(players);
  }

  // FUNÇÃO QUANDO CLICAR P COMEÇAR O GAME
  function onStartGame() {
    console.log('emitindo start game')
    socket?.emit('startGame');
  }

  function onReceiveStartGame(response: SocketData<{songs: Array<Song>}>) {
    setIsGameStarted(true);
    console.log('songs: ', response.data.songs);
    setSongs(response.data.songs);
  }

  function onNewRound(response: SocketData<{currentSong: CurrentSong}>) {
    console.log('currentSong: ', response.data.currentSong)
    setCurrentSong(response.data.currentSong);
  }

  return (
    <SocketContext.Provider value={{ players, onStartGame, songs, currentSong, isGameStarted }}>
      {children}
    </SocketContext.Provider>
  );
};

// Hook personalizado para usar o socket
export const useSocket = () => useContext(SocketContext);