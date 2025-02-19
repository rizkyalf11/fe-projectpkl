import { create } from "zustand";

interface MyState {
  idLembarAbsen: string;
  setIdLembarAbsen: (id: string) => void;
}

export const useMyStore = create<MyState>()((set) => ({
  idLembarAbsen: "",
  setIdLembarAbsen: (id) => set(() => ({ idLembarAbsen: id })),
}));
