


function getInstance() {
  const songPlayer = document.getElementById('song-player') as HTMLAudioElement;
  return songPlayer;
}

export class SongPlayerManager {
  static shoudStopOn: number | null = 2;

  static onTimeUpdate(event: React.SyntheticEvent<HTMLAudioElement, Event>) {
    const currentTime = event.currentTarget.currentTime;

    console.log({currentTime})

    if (
      SongPlayerManager.shoudStopOn !== null
      && currentTime >= SongPlayerManager.shoudStopOn
    ) {
      event.currentTarget.pause();
    }
  }

  static playSong(
    // song: CurrentSong | null | undefined
  ) {
    const songPlayer = getInstance();

    if (songPlayer) {
      songPlayer.src = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
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
}