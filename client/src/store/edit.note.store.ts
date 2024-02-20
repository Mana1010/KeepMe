import { create } from "zustand";
import { UserNote } from "@/store/note.store";
import React from "react";
export interface EditUserNote extends UserNote {
  createdAt: string;
  updatedAt: string;
  owner: string;
  _id: string;
}
interface StateEditNote {
  editInfo: EditUserNote;
}
interface EditNote extends StateEditNote {
  setEditInfo: (editData: EditUserNote) => void;
  setHandleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}
const store = (set: any) => ({
  editInfo: {} as EditUserNote,
  setEditInfo: (editData: EditUserNote) => {
    set({ editInfo: editData });
  },
  setHandleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;
    set((state: StateEditNote) => ({
      editInfo: {
        ...state.editInfo,
        [name]: value,
      },
    }));
  },
});

export const EditNoteStore = create<EditNote>(store);
