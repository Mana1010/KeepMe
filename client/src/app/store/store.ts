import { create } from "zustand";
interface State {
  openNavBar: boolean;
}
const store = (set: any) => ({
  openNavBar: false,
  setOpenNavbar: () => {
    set((state: State) => ({
      openNavBar: !state.openNavBar,
    }));
  },
});

export const utilStore = create(store);
