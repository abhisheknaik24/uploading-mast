import { create } from 'zustand';

interface SearchStore {
  search: string | null;
  setSearch: (search: string) => void;
}

export const useSearch = create<SearchStore>((set) => ({
  search: null,
  setSearch: (search) => set({ search }),
}));
