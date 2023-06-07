import { IPlaylist, ISong } from '@/types/types';

import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface SongState {
  songs: ISong[];
  currentSong: ISong | null;
  currentPlaylist: IPlaylist;
}

const initialState: SongState = {
  songs: [],
  currentSong: null,
  currentPlaylist: {
    category: 'newest-songs',
    label: 'Newest Songs',
  },
};

export const songSlice = createSlice({
  name: 'song',
  initialState,
  reducers: {
    addSongs: (state: SongState, action: PayloadAction<ISong[]>) => {
      state.songs = action.payload;
    },
    addCurrentSongId: (state: SongState, action: PayloadAction<string>) => {
      const data: ISong | undefined = state.songs.find(
        (song) => song.id === action.payload
      );

      if (data) {
        state.currentSong = data;
      } else {
        state.currentSong = null;
      }
    },
    addCurrentPlaylist: (
      state: SongState,
      action: PayloadAction<IPlaylist>
    ) => {
      state.currentPlaylist = action.payload;
    },
  },
});

export const { addSongs, addCurrentSongId, addCurrentPlaylist } =
  songSlice.actions;

export default songSlice.reducer;
