import { create } from "zustand";
import axios from "axios";
export interface State {
  openNavBar: boolean;
  currentUser: {
    id: string;
    email: string;
    username: string;
  } | null; // Include currentUser
  setOpenNavbar: () => void;
  setCurrentUser: () => Promise<void>;
}
const store = (set: any) => ({
  openNavBar: false,
  currentUser: null,
  setOpenNavbar: () => {
    set((state: State) => ({
      openNavBar: !state.openNavBar,
    }));
  },
  setCurrentUser: async () => {
    try {
      const url = await axios.get("http://localhost:5000/auth/userDetails", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        withCredentials: true,
      });
      if (url.status === 200) {
        set({ currentUser: url.data.message });
      }
    } catch (err) {
      set({ currentUser: null });
    }
  },
});

export const utilStore = create(store);
