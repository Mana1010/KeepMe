import { create } from "zustand";
import { UserNote } from "./note.store";
import React from "react";
import { TypeList } from "./note.store";
export interface EditUserNote extends UserNote {
  updatedAt: string;
  _id: string;
}
interface StateEditInfo {
  editInfo: EditUserNote;
  openBg: boolean;
  openListStyle: boolean;
}
interface EditInfo extends StateEditInfo {
  setEditInfo: (editData: EditUserNote) => void;
  setHandleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  colorPickonMouseOver: (color: string) => void;
  colorPickOnClick: (color: string) => void;
  setOpenListStyle: () => void;
  setPinned: () => void;
  setBold: () => void;
  setItalic: () => void;
  setOpenBg: () => void;
  setOpenBgPropagate: () => void;
  setOpenListStylePropagate: () => void;
  setListOpen: () => void;
  listType: (type: string) => void;
  setListSymbol: (filterSymbols: TypeList | undefined) => void;
  removeDuplicateSymbols: (filterSymbols: TypeList | undefined) => void;
}
const store = (set: any) => ({
  editInfo: {} as EditUserNote,
  openBg: false,
  openListStyle: false,
  setEditInfo: (editData: EditUserNote) => {
    set({ editInfo: editData });
  },
  setHandleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;
    set((state: StateEditInfo) => ({
      editInfo: {
        ...state.editInfo,
        [name]: value,
      },
    }));
  },
  colorPickonMouseOver: (color: string) => {
    set((state: StateEditInfo) => ({
      editInfo: {
        ...state.editInfo,
        bgColor: color,
      },
    }));
  },
  colorPickOnClick: (color: string) => {
    set((state: StateEditInfo) => ({
      editInfo: {
        ...state.editInfo,
        bgColor: color,
      },
    }));
  },

  setOpenListStyle: () =>
    set((state: StateEditInfo) => ({
      openListStyle: !state.openListStyle,
    })),
  setOpenBg: () => {
    set((state: StateEditInfo) => ({
      openBg: !state.openBg,
    }));
  },
  setOpenBgPropagate: () => {
    set({ openBg: false });
  },
  setOpenListStylePropagate: () => {
    set({ openListStyle: false });
  },
  setPinned: () => {
    set((state: StateEditInfo) => ({
      editInfo: {
        ...state.editInfo,
        isPinned: !state.editInfo.isPinned,
      },
    }));
  },
  setBold: () => {
    set((state: StateEditInfo) => ({
      editInfo: {
        ...state.editInfo,
        isBold: !state.editInfo.isBold,
      },
    }));
  },
  setItalic: () => {
    set((state: StateEditInfo) => ({
      editInfo: {
        ...state.editInfo,
        isItalic: !state.editInfo.isItalic,
      },
    }));
  },
  setListOpen: () => {
    set((state: StateEditInfo) => ({
      editInfo: {
        ...state.editInfo,
        isListOpen: !state.editInfo.isListOpen,
      },
    }));
  },
  listType: (type: string) => {
    set((state: StateEditInfo) => ({
      editInfo: {
        ...state.editInfo,
        listType: type,
      },
    }));
  },
  setListSymbol: (filterSymbols: TypeList | undefined) => {
    set((state: StateEditInfo) => ({
      editInfo: {
        ...state.editInfo,
        content: state.editInfo.content + filterSymbols?.symbol + " ",
      },
    }));
  },
  removeDuplicateSymbols: (filterSymbols: TypeList | undefined) => {
    set((state: StateEditInfo) => ({
      editInfo: {
        ...state.editInfo,
        content: filterSymbols?.symbol + " " + state.editInfo.content,
      },
    }));
  },
});

export const editNoteStore = create<EditInfo>(store);
