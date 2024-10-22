import { create } from "zustand";

export const useSearchStore = create((set) => ({
  searchType: "movie",
  setSearchType: (type) => set({ searchType: type }),
}));
