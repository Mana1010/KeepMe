"use client";
import React, { SetStateAction, useState } from "react";
import Image from "next/image";
import keepMeIcon from "./img/keepMe-lightmode.png";
import { LuPin, LuPinOff } from "react-icons/lu";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { IoColorFillOutline } from "react-icons/io5";
import { TbBold, TbItalic } from "react-icons/tb";
import {
  LiaListAltSolid,
  LiaListOlSolid,
  LiaListUlSolid,
} from "react-icons/lia";
import { useForm } from "react-hook-form";
import { title } from "process";
interface Data {
  setAddNote: any;
}
interface UserNote {
  title: string;
  content: string;
  isBold: boolean;
  isItalic: boolean;
  isFavorite: boolean;
  isPinned: boolean;
  listType?: string;
  bgColor: string;
}
function AddNote({ setAddNote }: Data) {
  const bgColor = [
    "white",
    "#D9BCFC",
    "#BD83FB",
    "#B5EBD3",
    "#F2DC49",
    "#FFB379",
    "#FAA4A5",
    "#F9785B",
    "#FF6160",
    "#FFCAD4",
    "#FFACC6",
    "#FF98B6",
    "#FF87AB",
    "#C4DAC3",
    "#97AF95",
    "#597066",
    "#45544F",
    "#F3E6DE",
    "#E9D1C5",
    "#D5B6A4",
    "#D2A78F",
    "#83B3F1",
    "#579AE9",
    "#2E7AD2",
    "#125FBB",
  ];
  const typeList = ["none", "dot", "number", "check"];
  const [note, setNote] = useState<UserNote>({
    title: "Untitled Note",
    content: "",
    isBold: false,
    isItalic: false,
    isFavorite: false,
    isPinned: false,
    bgColor: "white",
  });
  const [openBgColor, setOpenBgColor] = useState<boolean>(false);
  const [openListStyle, setOpenListStyle] = useState<boolean>(false);
  function submitNote(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLButtonElement
    >
  ) {
    e.preventDefault();
    const { value, name } = e.target;
    setNote({
      ...note,
      [name]: value,
    });
  }
  function colorPickonMouseOver(color: string) {
    setNote({
      ...note,
      bgColor: color,
    });
  }
  function colorPickOnClick(color: string) {
    setNote({
      ...note,
      bgColor: color,
    });
    setOpenBgColor((prev) => !prev);
  }
  function openList() {
    setOpenListStyle((prev) => !prev);
  }
  function listType(type: string) {
    setNote({
      ...note,
      listType: type,
    });
  }
  return (
    <div
      onClick={() => setOpenBgColor(false)}
      className="absolute w-full h-screen flex justify-center items-center inset-0 backdrop-blur-lg z-50"
    >
      <form className="w-full md:w-[70%] lg:w-[50%] bg-white h-full md:h-[460px] absolute border-2 shadow-sm shadow-black px-2 py-2">
        <header className="flex justify-between items-center py-2">
          <div>
            <Image width={80} src={keepMeIcon} alt="icon" priority />
          </div>
          <div className="space-x-3 flex">
            <button name="isPinned" type="button" className="text-xl">
              <LuPin />
            </button>
            <button name="isBold" type="button" className="text-xl">
              <MdFavoriteBorder />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation(), setOpenBgColor((prev) => !prev);
              }}
              type="button"
              className="text-xl flex gap-2 px-1.5 items-center border-[1px] border-slate-300 py-[0.1rem] rounded-lg relative"
            >
              <div
                style={{ backgroundColor: note.bgColor }}
                className={`border-[1px] border-slate-300 w-4 h-4 rounded-full`}
              ></div>

              <IoColorFillOutline />
            </button>
            <div
              className={`absolute top-[50px] right-2 w-[200px] h-[150px] md:h-[100px] p-1 grid grid-cols-5 md:grid-cols-9 justify-center items-center bg-white shadow-md rounded-sm z-10 ${
                !openBgColor && "hidden"
              }`}
            >
              {bgColor.map((colors) => (
                <button
                  onMouseOver={() => colorPickonMouseOver(colors)}
                  onClick={() => colorPickOnClick(colors)}
                  key={colors}
                  type="button"
                  style={{ backgroundColor: colors }}
                  className={`md:w-4 md:h-4 w-6 h-6 rounded-full ${
                    colors === "white" && "border-[1px] border-slate-300"
                  }`}
                ></button>
              ))}
            </div>
            <button
              onClick={() =>
                setNote({
                  ...note,
                  isBold: !note.isBold,
                })
              }
              name="isBold"
              type="button"
              className={`text-xl p-[2px] ${
                note.isBold &&
                "bg-slate-100 rounded-lg border-[1px] border-slate-300"
              }`}
            >
              <TbBold />
            </button>
            <button
              onClick={() =>
                setNote({
                  ...note,
                  isItalic: !note.isItalic,
                })
              }
              name="isItalic"
              type="button"
              className={`text-xl p-[2px] ${
                note.isItalic &&
                "bg-slate-100 rounded-lg border-[1px] border-slate-300"
              }`}
            >
              <TbItalic />
            </button>
            <button
              type="button"
              className={`text-xl p-[2px] ${
                note.listType === "none" &&
                "bg-slate-100 rounded-lg border-[1px] border-slate-300"
              }`}
            >
              <LiaListOlSolid />
            </button>
            <div
              className={`absolute top-[50px] right-2 w-[100px] p-1 flex justify-center items-center shadow-md rounded-sm z-10 bg-black ${
                !openListStyle && "hidden"
              }`}
            >
              {typeList.map((type) => (
                <button
                  onMouseOver={() => listType(type)}
                  onClick={() => listType(type)}
                  key={type}
                  type="button"
                  className={`md:w-4 md:h-4 w-6 h-6 rounded-full 
                   "border-[1px] border-slate-300"
                  `}
                ></button>
              ))}
            </div>
          </div>
        </header>
        <div className="pt-4 flex flex-col gap-7 px-2">
          <div className="shadow-md py-2.5 rounded-sm w-full flex space-x-2 px-2">
            <h4>TITLE:</h4>
            <input
              onChange={submitNote}
              name="title"
              value={note.title}
              className="w-full font-extrabold outline-none"
            />
          </div>
          <div
            style={{ backgroundColor: note.bgColor }}
            className="shadow-lg w-full md:h-[250px] h-[68vh] rounded-sm p-2"
          >
            <textarea
              style={{
                fontWeight: note.isBold ? "900" : "500",
                fontStyle: note.isItalic ? "italic" : "normal",
              }}
              onChange={submitNote}
              name="content"
              value={note.content}
              className="w-full resize-none h-full outline-none bg-transparent"
            ></textarea>
          </div>
        </div>
        <div className="w-full flex gap-2 pt-2">
          <button
            onClick={() => setAddNote((prev: boolean) => !prev)}
            type="button"
            className="w-[20%] py-2 bg-black text-white rounded-md"
          >
            BACK
          </button>
          <button
            type="submit"
            className="w-[80%] py-2 bg-black text-white rounded-md"
          >
            ADD NOTE
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddNote;
