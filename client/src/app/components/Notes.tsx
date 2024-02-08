"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import keepMeIcon from "./img/keepMe-lightmode.png";
import { LuPin } from "react-icons/lu";
import { MdFavoriteBorder, MdKeyboardArrowDown } from "react-icons/md";
import { IoColorFillOutline } from "react-icons/io5";
import { TbBold, TbItalic } from "react-icons/tb";
import { LiaListAltSolid, LiaListUlSolid } from "react-icons/lia";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
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
  isListOpen: boolean;
  listType: string;
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
  const typeList = [
    {
      name: "dot",
      icon: <LiaListUlSolid />,
      symbol: "●",
    },
    {
      name: "check",
      icon: <LiaListAltSolid />,
      symbol: "✔",
    },
  ];
  const [note, setNote] = useState<UserNote>({
    title: "Untitled Note",
    content: "",
    isBold: false,
    isItalic: false,
    isFavorite: false,
    isPinned: false,
    isListOpen: false,
    listType: "dot",
    bgColor: "white",
  });
  const [openBgColor, setOpenBgColor] = useState<boolean>(false);
  const [openListStyle, setOpenListStyle] = useState<boolean>(false);
  const mutateNote = useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        "http://localhost:5000/user/notes",
        note,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
          withCredentials: true,
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      setAddNote((prev: boolean) => !prev);
      setNote({
        title: "Untitled Note",
        content: "",
        isBold: false,
        isItalic: false,
        isFavorite: false,
        isPinned: false,
        isListOpen: false,
        listType: "dot",
        bgColor: "white",
      });
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(error.response.data.message);
    },
  });
  const listFilter = typeList.find((type) => type.name === note.listType);
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
  function puttingListSymbol(e: any) {
    const filterSymbols = typeList.find((type) => type.name === note.listType);
    if (e.key === "Enter" && note.isListOpen) {
      setNote({
        ...note,
        content: note.content + filterSymbols?.symbol + " ",
      });
      return;
    }
  }
  useEffect(() => {
    const filterSymbols = typeList.find((type) => type.name === note.listType);
    const removeDot = note.content.split("");
    if (note.isListOpen && removeDot[0] !== filterSymbols?.symbol) {
      if (filterSymbols?.name === note.listType) {
        setNote({
          ...note,
          content: filterSymbols?.symbol + " " + note.content,
        });
      }
    }
    return;
  }, [note.isListOpen]);

  return (
    <div
      onClick={() => {
        setOpenBgColor(false);
        setOpenListStyle(false);
      }}
      className="absolute w-full h-screen flex justify-center items-center inset-0 backdrop-blur-lg z-50"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutateNote.mutate();
        }}
        className="w-full md:w-[70%] lg:w-[50%] bg-white h-full md:h-[460px] absolute border-2 shadow-sm shadow-black px-2 py-2"
      >
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
              className="text-xl flex gap-2 px-1.5 items-center shadow-md py-[0.1rem] rounded-lg relative"
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
                    colors === "white" && "border-[1px] border-slate-200"
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
                "bg-slate-100 rounded-lg border-[1px] border-slate-200"
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
                "bg-slate-100 rounded-lg border-[1px] border-slate-200"
              }`}
            >
              <TbItalic />
            </button>
            <div className="flex items-center shadow-md p-[0.2rem] gap-1">
              <button
                onClick={() =>
                  setNote({ ...note, isListOpen: !note.isListOpen })
                }
                type="button"
                className={`text-lg rounded-md ${
                  note.isListOpen && "bg-slate-100 border-[1px]"
                }`}
              >
                {listFilter?.icon}
              </button>
              <button
                type="button"
                className="shadow-md"
                onClick={(e) => {
                  e.stopPropagation();
                  openList();
                }}
              >
                <MdKeyboardArrowDown />
              </button>
            </div>

            <div
              className={`absolute top-[50px] right-2 w-[100px] p-1 flex justify-center items-center shadow-md rounded-sm z-10 gap-2 ${
                !openListStyle && "hidden"
              }`}
            >
              {typeList.map((type) => (
                <button
                  onMouseOver={() => listType(type.name)}
                  onClick={() => listType(type.name)}
                  key={type.name}
                  type="button"
                  className={`md:w-4 md:h-4 w-6 h-6 rounded-full 
                   "border-[1px] border-slate-300"
                  `}
                >
                  {type.icon}
                </button>
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
              id="textarea"
              style={{
                fontWeight: note.isBold ? "900" : "500",
                fontStyle: note.isItalic ? "italic" : "normal",
              }}
              onKeyUp={puttingListSymbol}
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
