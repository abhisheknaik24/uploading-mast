import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ICurrentSong, ISong } from '@/types/types';

export interface SongState {
  songs: ISong[];
  currentSong: ICurrentSong | null;
}

const initialState: SongState = {
  songs: [],
  currentSong: null,
};

export const songSlice = createSlice({
  name: 'song',
  initialState,
  reducers: {
    addSongs: (state: SongState, action: PayloadAction<ISong[]>) => {
      if (action.payload) {
        state.songs = action.payload;
      }
    },
    addCurrentPlaySong: (
      state: SongState,
      action: PayloadAction<ICurrentSong>
    ) => {
      if (action.payload) {
        state.currentSong = action.payload;
      }
    },
    updateSongPlay: (state: SongState) => {
      if (state.currentSong) {
        state.currentSong.isPlay = !state.currentSong.isPlay;
      }
    },
    updateSongMute: (state: SongState) => {
      if (state.currentSong) {
        state.currentSong.isMute = !state.currentSong.isMute;
      }
    },
  },
});

export const { addSongs, addCurrentPlaySong, updateSongPlay, updateSongMute } =
  songSlice.actions;

export default songSlice.reducer;
