"use client";
import React, { SetStateAction } from "react";
import Image from "next/image";
import keepMeIcon from "./img/keepMe-lightmode.png";
import { LuPin, LuPinOff } from "react-icons/lu";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { IoColorFillOutline } from "react-icons/io5";
import { TbBold, TbBoldOff } from "react-icons/tb";
import { useForm } from "react-hook-form";
interface Data {
  setAddNote: any;
}
interface UserNote {
  title: string;
  content: string;
  isBold: boolean;
  isPinned: boolean;
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
  const {} = useForm({});
  return (
    <div className="absolute w-full h-screen flex justify-center items-center inset-0 backdrop-blur-lg">
      <form className="w-full md:w-[70%] lg:w-[50%] bg-white h-full md:h-[460px] absolute border-2 shadow-sm shadow-black px-2 py-2">
        <header className="flex justify-between items-center py-2">
          <div>
            <Image width={80} src={keepMeIcon} alt="icon" priority />
          </div>
          <div className="space-x-3 flex">
            <button type="button" className="text-xl">
              <LuPin />
            </button>
            <button type="button" className="text-xl">
              <MdFavoriteBorder />
            </button>
            <button
              type="button"
              className="text-xl flex gap-2 px-1.5 items-center border-[1px] border-slate-300 py-[0.1rem] rounded-lg relative"
            >
              <div className="border-1 border-black w-4 h-4 rounded-full bg-red-500"></div>
              <IoColorFillOutline />
            </button>
            <div className="absolute top-[50px] right-2 w-[200px] h-[100px] p-1 grid grid-cols-10 justify-center items-center bg-white shadow-md rounded-sm">
              {bgColor.map((colors) => (
                <button
                  type="button"
                  style={{ backgroundColor: colors }}
                  className={`w-4 h-4 rounded-full ${
                    colors === "white" && "border-[1px] border-slate-300"
                  }`}
                ></button>
              ))}
            </div>
          </div>
        </header>
        <div className="pt-4 flex flex-col gap-7 px-2">
          <div className="shadow-md py-2.5 rounded-sm w-full flex space-x-2 px-2">
            <h4>TITLE:</h4>
            <input className="w-full font-extrabold outline-none" />
          </div>
          <div className="shadow-lg w-full md:h-[250px] h-[68vh] rounded-sm p-2">
            <textarea className="w-full resize-none h-full outline-none"></textarea>
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
