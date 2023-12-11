import { create } from 'zustand';

interface SongStore {
  playlistId: string | null;
  songId: string | null;
  setPlaylistId: (playlistId: string) => void;
  setSongId: (songId: string) => void;
}

export const useSong = create<SongStore>((set) => ({
  playlistId: null,
  songId: null,
  setPlaylistId: (playlistId) => set({ playlistId }),
  setSongId: (songId) => set({ songId }),
}));
