import { CurrentSong } from "./zustand/game";



function getInstance() {
  const songPlayer = document.getElementById('song-player') as HTMLAudioElement;
  return songPlayer;
}

export class SongPlayerManager {
  static shoudStopOn: number | null = 2;

  static onTimeUpdate(event: React.SyntheticEvent<HTMLAudioElement, Event>) {
    const currentTime = event.currentTarget.currentTime;

    if (
      SongPlayerManager.shoudStopOn !== null
      && currentTime >= SongPlayerManager.shoudStopOn
    ) {
      event.currentTarget.pause();
    }
  }

  static playSong(song: CurrentSong) {
    const songPlayer = getInstance();

    if (songPlayer) {
      songPlayer.src = song.url;
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