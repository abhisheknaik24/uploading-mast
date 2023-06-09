import { ICategory, ISong } from '@/types/types';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface SongState {
  categories: ICategory[];
  currentCategory: ICategory | null;
  songs: ISong[];
  currentSong: ISong | null;
  librarySongs: ISong[];
  previousSong: ISong | null;
  nextSong: ISong | null;
}

const initialState: SongState = {
  categories: [],
  currentCategory: null,
  songs: [],
  currentSong: null,
  librarySongs: [],
  previousSong: null,
  nextSong: null,
};

export const songSlice = createSlice({
  name: 'song',
  initialState,
  reducers: {
    addCategories: (state: SongState, action: PayloadAction<ICategory[]>) => {
      state.categories = action.payload;
    },
    addCurrentCategoryId: (state: SongState, action: PayloadAction<string>) => {
      const data: ICategory | undefined = state.categories.find(
        (category) => category._id === action.payload
      );

      if (data) {
        state.currentCategory = data;
      } else {
        state.currentCategory = null;
      }
    },
    addSongs: (state: SongState, action: PayloadAction<ISong[]>) => {
      state.songs = action.payload;
    },
    addCurrentSongId: (state: SongState, action: PayloadAction<string>) => {
      const data: ISong | undefined = state.songs.find((song, index) => {
        if (song._id === action.payload) {
          if (index > 0) {
            state.previousSong = state.songs[index - 1];
          } else {
            state.previousSong = null;
          }

          if (index < state.songs.length - 1) {
            state.nextSong = state.songs[index + 1];
          } else {
            state.nextSong = null;
          }

          return song;
        }
      });

      if (data) {
        state.currentSong = data;
      } else {
        state.currentSong = null;
      }
    },
    addLibrarySongs: (state: SongState, action: PayloadAction<ISong[]>) => {
      state.librarySongs = action.payload;
    },
  },
});

export const {
  addCategories,
  addCurrentCategoryId,
  addSongs,
  addCurrentSongId,
  addLibrarySongs,
} = songSlice.actions;

export default songSlice.reducer;
