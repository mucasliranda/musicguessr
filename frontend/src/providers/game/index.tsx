'use client'

import { Player, Song } from '@/shared/model';
import React, { MutableRefObject, createContext, useContext, useEffect, useRef, useState } from 'react'
import { useCookies } from 'next-client-cookies';
// import SocketSingleton from '@/shared/utils/socket';
import { useConfetti } from '@/shared/components/Confetti';
import { SocketResponse, SocketSingleton } from '@/shared/utils/socket/socketClient';

import { uniqueNamesGenerator, colors, adjectives, animals, Config } from 'unique-names-generator';



interface CurrentSong extends Song {
  startAt: number;
}

interface Guess extends Song {
  right?: boolean;
}

const GameContext = createContext({
  // GAME
  players: [] as Array<Player>,
  onStartGame: () => { },
  songs: [] as Array<Song>,
  isGameStarted: false,
  currentSong: null as CurrentSong | null,
  guess: null as Guess | null,
  onGuessSongs: (song: Song) => { },
  onTimedOut: () => { },
  roundEnded: false,
  setGameId: (gameId: string) => { },

  // TIMER
  progress: 100,
  finished: false,


  // SONG PLAYER
  playSong: () => { },
  playerRef: null as unknown as MutableRefObject<HTMLAudioElement | null>,
  onTimeUpdate: () => { },
  volume: 50,
  setVolume: (volume: number) => { },


  // CONFETTI
  confetti: false,
  toggleConfetti: () => { },
});

const guessDuration = 10000; // 10 SECS
const timerInterval = 50;
let timer: NodeJS.Timeout;


function generateRandomName() {
  const customConfig: Config = {
    dictionaries: [colors, adjectives, animals],
    separator: '-',
    length: 3,
  };

  return uniqueNamesGenerator(customConfig)
}

export function GameProvider({ children }) {
  const cookies = useCookies();


  const { confetti, toggleConfetti } = useConfetti();

  // GAME
  const [gameId, setGameId] = useState('' as string);
  const [username, setUsername] = useState(generateRandomName());
  const [players, setPlayers] = useState<Array<Player>>([]);
  const [songs, setSongs] = useState<Array<Song>>([]);
  const [currentSong, setCurrentSong] = useState<CurrentSong | null>(null);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [guess, setGuess] = useState<Guess | null>(null);
  const [roundEnded, setRoundEnded] = useState(false);

  /**
   * currentRound
   * maxRound
   * guessTime
   * endRoundTime
   *
  **/

  // TIMER
  const [progress, setProgress] = useState(100);
  const [finished, setFinished] = useState(false);

  // SONG PLAYER
  const playerRef = useRef<HTMLAudioElement | null>(null);
  const [volume, _setVolume] = useState(50);

  function playSong(song: CurrentSong | null | undefined = currentSong) {
    if (
      !!playerRef.current
      && !!song
    ) {
      playerRef.current.load();

      playerRef.current.src = song.url;
      playerRef.current.currentTime = song.startAt;

      playerRef.current.play().then(() => { }).catch((err) => {
        console.log(err)
        playerRef.current?.play();
      });
    }
  }

  function onTimeUpdate() {
    if (
      playerRef.current
      && currentSong
      && playerRef.current.currentTime - currentSong.startAt > 1.5
    ) {
      playerRef.current.pause()
    }
  }

  function setVolume(volume: number) {
    _setVolume(volume);
    setVolumeOnCookie(volume);

    if (playerRef.current) {
      playerRef.current.volume = volume / 100;
    }
  }

  function setVolumeOnCookie(volume: number) {
    cookies.set('player-volume', volume.toString());
  }

  function getVolumeFromCookie() {
    const volume = cookies.get('player-volume');
    if (volume) {
      return Number(volume);
    }
    return 0.5;
  }

  function onTimerFinished() {
    setFinished(true);
    onTimedOut();
  }

  function startTimer(duration = guessDuration) {
    resetTimer();
    timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 0) {
          clearInterval(timer);
          onTimerFinished();
          return 0;
        }
        const diff = (timerInterval / duration) * 100; // Calculate the percentage to decrease for each 100ms
        return Math.max(oldProgress - diff, 0);
      });
    }, timerInterval);

    return () => {
      clearInterval(timer);
    };
  }

  function endTimer() {
    clearInterval(timer);
    setFinished(true);
  }

  function resetTimer() {
    clearInterval(timer);
    setProgress(100);
    setFinished(false);
  }

  function onChangePlayers(response: SocketResponse<{ players: Array<Player> }>) {
    console.log({ players: response.data.players })
    setPlayers(response.data.players);
  }

  // FUNÇÃO QUANDO CLICAR P COMEÇAR O GAME
  function onStartGame() {
    console.log('emitindo start game')
    const socket = SocketSingleton.getSocket();
    socket.emit('startGame');
  }

  function onReceiveStartGame() {
    setIsGameStarted(true);
  }

  function onGuessSongs(song: Song) {
    if (!!!guess) {
      const socket = SocketSingleton.getSocket();

      setGuess({
        ...song,
        right: song.id === currentSong?.id
      });

      socket.emit('guessSong', song);
    }
  }

  function onTimedOut() {
    const socket = SocketSingleton.getSocket();
    socket.emit('timedOut');
  }

  function onEndRound(response: SocketResponse<{ players: Array<Player> }>) {
    endTimer();
    setRoundEnded(true);
    startTimer(5000);
    setPlayers(response.data.players);
  }

  async function onNewRound(response: SocketResponse<{ currentSong: CurrentSong, songs: Array<Song> }>) {
    setRoundEnded(false);
    startTimer();
    setCurrentSong(response.data.currentSong);
    setSongs(response.data.songs)
    setGuess(null);
    playSong(response.data.currentSong);
  }

  useEffect(() => {
    if (gameId) {
      const socket = SocketSingleton.getSocket();

      socket.connect({ gameId, username });
  
      // socket.on('players', onChangePlayers)
      socket.on('players', (a) => {
        console.log({a})
      })
  
      socket.on('startGame', onReceiveStartGame)
  
      socket.on('newRound', onNewRound)
  
      socket.on('endRound', onEndRound)
  
      socket.on('guess', onChangePlayers)
  
      return () => {
        socket.disconnect();
        socket.off('players', onChangePlayers);
        socket.off('startGame', onReceiveStartGame);
        socket.off('newRound', onNewRound);
        socket.off('endRound', onEndRound);
        socket.off('guess', onChangePlayers);
      }
    }
  }, [gameId]);

  useEffect(() => {
    const volume = getVolumeFromCookie();
    setVolume(volume);
  }, [])

  return (
    <GameContext.Provider
      value={{
        // GAME
        players,
        onStartGame,
        songs,
        currentSong,
        isGameStarted,
        guess,
        onGuessSongs,
        onTimedOut,
        roundEnded,
        setGameId,


        // TIMER
        progress,
        finished,


        // SONG PLAYER
        playSong,
        playerRef,
        onTimeUpdate,
        volume,
        setVolume,


        // CONFETTI
        confetti,
        toggleConfetti,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

// Hook personalizado para usar o Game
export const useGame = () => useContext(GameContext);