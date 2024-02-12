import { create } from "zustand";
import axios from "axios";
import React from "react";
export interface State {
  openNavBar: boolean;
  currentUser: {
    id: string;
    email: string;
    username: string;
  } | null;
  setCurrentUser: () => Promise<void>;
  setOpenNavbar: () => void;
  logOut: () => Promise<void>;
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
  logOut: async () => {
    await axios.post("http://localhost:5000/auth/logout", null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
      withCredentials: true,
    });
    set({
      currentUser: null,
    });
    localStorage.removeItem("userToken");
  },
});

export const utilStore = create(store);
