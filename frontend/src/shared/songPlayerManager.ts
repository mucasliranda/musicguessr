import { CurrentSong, useGameStore } from "./store/client/game";



function getInstance() {
  const songPlayer = document.getElementById('song-player') as HTMLAudioElement;
  return songPlayer;
}

export class SongPlayerManager {
  static shouldPauseOn: number | null = null;

  static onTimeUpdate(event: React.SyntheticEvent<HTMLAudioElement, Event>) {
    const currentTime = event.currentTarget.currentTime;
    
    if (
      SongPlayerManager.shouldPauseOn !== null
      && currentTime >= SongPlayerManager.shouldPauseOn
    ) {
      event.currentTarget.pause();
    }
  }

  static setShouldPauseOn() {
    const songDuration = useGameStore.getState().songDuration;
    const currentSong = useGameStore.getState().currentSong;

    this.shouldPauseOn = 
      (currentSong !== null && currentSong.startAt !== null && songDuration !== null) ? 
      (currentSong?.startAt || 0) + (songDuration / 1000) 
      : null;
  }

  static playSong(song: CurrentSong) {
    const songPlayer = getInstance();

    if (songPlayer) {
      this.setShouldPauseOn();
      songPlayer.src = song.url;
      songPlayer.currentTime = song.startAt || 0;

      songPlayer.play().then(() => { }).catch((err) => {
        console.log(err)
        songPlayer.play();
      });
    }
  }

  static replaySong() {
    const songPlayer = getInstance();

    if (songPlayer) {
      songPlayer.currentTime = 0;
      songPlayer.play().then(() => { }).catch((err) => {
        console.log(err)
        songPlayer.play();
      });
    }
  }

  static resumeSongOnRoundEnded() {
    const songPlayer = getInstance();

    this.shouldPauseOn = null;

    if (
      songPlayer
      && songPlayer.paused
    ) {
      songPlayer.play().then(() => { }).catch((err) => {
        console.log(err)
        songPlayer.play();
      });
    }
  }

  static pauseSong() {
    const songPlayer = getInstance();

    if (songPlayer) {
      songPlayer.pause();
    }
  }

  static setVolume(volume: number) {
    const songPlayer = getInstance();

    if (songPlayer) {
      songPlayer.volume = volume / 100;
    }
  }
}