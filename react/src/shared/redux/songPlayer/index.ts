import { PayloadAction, createSlice } from "@reduxjs/toolkit";



export interface SongPlayerState {
  
}

const initialState: SongPlayerState = {
  
};

const songPlayer = document.getElementById('songPlayer') as HTMLAudioElement;


function getParagraph() {
  const paragraph = document.getElementById('paragraph') as HTMLParagraphElement;
  
  return paragraph;
}

export const songPlayerSlice = createSlice({
  name: 'songPlayer',
  initialState,
  reducers: {
    changeColor: () => {
      const paragraph = getParagraph();
      const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'brown', 'black', 'white'];

      const randomColor = colors[Math.floor(Math.random() * colors.length)];

      console.log({randomColor})

      paragraph.style.color = randomColor;
    }
    // playSong: (state, action: PayloadAction<string>) => {
    //   songPlayer.src = action.payload;
    //   songPlayer.play();
    // },
    // pauseSong: () => {
    //   songPlayer.pause();
    // },
  }
});

export const { changeColor } = songPlayerSlice.actions;

export default songPlayerSlice.reducer;
