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
  currentSong: null as Song & {startAt: number} | null,
  selectedSong: null as Song | null,
  onGuessSongs: (song: Song) => {}
});


// Provider
export function SocketProvider({ children }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [players, setPlayers] = useState<Array<Player>>([]);
  const [songs, setSongs] = useState<Array<Song>>([]);
  const [currentSong, setCurrentSong] = useState<Song & {startAt: number} | null>(null);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const [selectedSong, setSelectedSong] = useState<Song | null>(null);

  useEffect(() => {
    const newSocket = io('http://localhost:3005'); // Substitua com a URL do seu servidor
    setSocket(newSocket);

    newSocket.connect();

    newSocket.on('players', onChangePlayers)

    newSocket.on('startGame', onReceiveStartGame)

    newSocket.on('newRound', onNewRound)

    newSocket.on('guess', onChangePlayers)

    // return () => {
    //   newSocket.disconnect();
    //   newSocket.off('players', onChangePlayers);
    // }
  }, []);

  function onChangePlayers(response: SocketData<{players: Array<Player>}>) {
    console.log({players: response.data.players})
    setPlayers(response.data.players);
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
    setSelectedSong(null);
  }

  function onGuessSongs(song: Song) {
    // SE JÁ TIVER CHUTADO UMA MUSICA, NAO TERÁ OUTRA CHANCE
    if(!selectedSong) {
      setSelectedSong(song);
      socket?.emit('guessSong', song);
    }
  }

  return (
    <SocketContext.Provider value={{ players, onStartGame, songs, currentSong, isGameStarted, selectedSong, onGuessSongs }}>
      {children}
    </SocketContext.Provider>
  );
};

// Hook personalizado para usar o socket
export const useSocket = () => useContext(SocketContext);