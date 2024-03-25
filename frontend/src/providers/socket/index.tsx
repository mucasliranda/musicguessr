'use client'

import { Player, Song } from '@/shared/model';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client';
import { useLinearTimer } from '../linearTimer';



interface SocketData<T> {
  event: string;
  data: T;
}

interface CurrentSong extends Song {
  startAt: number;
}

interface Guess extends Song {
  right?: boolean;
}

// Criação do contexto
const SocketContext = createContext({
  players: [] as Array<Player>,
  onStartGame: () => {},
  songs: [] as Array<Song>,
  isGameStarted: false,
  currentSong: null as CurrentSong | null,
  guess: null as Guess | null,
  onGuessSongs: (song: Song) => {},
  onTimedOut: () => {},
});


// Provider
export function SocketProvider({ children }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [players, setPlayers] = useState<Array<Player>>([]);
  const [songs, setSongs] = useState<Array<Song>>([]);
  const [currentSong, setCurrentSong] = useState<CurrentSong | null>(null);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const [guess, setGuess] = useState<Guess | null>(null);

  const { startTimer, endTimer } = useLinearTimer();

  useEffect(() => {
    const newSocket = io('http://localhost:3005'); // Substitua com a URL do seu servidor
    setSocket(newSocket);

    newSocket.connect();

    newSocket.on('players', onChangePlayers)

    newSocket.on('startGame', onReceiveStartGame)

    newSocket.on('newRound', onNewRound)

    newSocket.on('guess', onChangePlayers)

    newSocket.on('endRound', endTimer)

    return () => {
      newSocket.disconnect();
      newSocket.off('players', onChangePlayers);
      newSocket.off('startGame', onReceiveStartGame);
      newSocket.off('newRound', onNewRound);
      newSocket.off('guess', onChangePlayers);
      newSocket.off('endRound', endTimer);
    }
  }, []);

  function onChangePlayers(response: SocketData<{players: Array<Player>}>) {
    setPlayers(response.data.players);
  }

  // FUNÇÃO QUANDO CLICAR P COMEÇAR O GAME
  function onStartGame() {
    console.log('emitindo start game')
    socket?.emit('startGame');
  }

  function onReceiveStartGame(response: SocketData<{songs: Array<Song>}>) {
    setIsGameStarted(true);
    setSongs(response.data.songs);
  }

  function onNewRound(response: SocketData<{currentSong: CurrentSong}>) {
    console.log('currentSong: ', response.data.currentSong)
    console.log(startTimer)
    startTimer();
    setCurrentSong(response.data.currentSong);
    setGuess(null);
  }

  function onGuessSongs(song: Song) {
    // SE JÁ TIVER CHUTADO UMA MUSICA, NAO TERÁ OUTRA CHANCE
    // console.log({
    //   guess: guess,
    //   guessBool: guess !== null,
    //   disable: guess !== null && guess?.id !== song.id ,
    //   green: guess !== null && guess?.right,
    //   red: guess !== null && guess?.right == false
    // })

    if(!guess) {
      setGuess(song);
      console.log({song, guess})
      socket?.emit('guessSong', song);
    }
  }

  function onTimedOut() {
    console.log(`timed out dentro do use`, guess, !!!guess, 'tem que ser true <----')
    // PRECISO VERIFICAR SE ELE JÁ CHUTOU UMA MUSICA ANTES DE ENVIAR O TIMEDOUT
    if (!!!guess) {
      socket?.emit('timedOut');
    }
  }

  return (
    <SocketContext.Provider value={{ players, onStartGame, songs, currentSong, isGameStarted, guess, onGuessSongs, onTimedOut }}>
      {children}
    </SocketContext.Provider>
  );
};

// Hook personalizado para usar o socket
export const useSocket = () => useContext(SocketContext);