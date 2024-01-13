import { create } from "zustand";
import axios from "axios";
interface State {
  openNavBar: boolean;
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
      const url = await axios.get("http://localhost:5000/auth/verifyAccount", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        withCredentials: true,
      });
      if (url.status === 200) {
        set({ currentUser: url.data.message });
      }
    } catch (err) {
      console.error(err);
    }
  },
});

export const utilStore = create(store);
