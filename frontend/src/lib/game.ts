
const store: any = {

}

export function initGame(game: string, artist: string, round: string) {
  store[game] = {
    artist: artist,
    round: {
      [round]: {
        music: ''
      }
    }
  }
}

// round= musicID, seek