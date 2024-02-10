import React from "react";
import { NoteData } from "@/app/notes/page";
import loadingAnimation from "./loading-animation.gif";
import Image from "next/image";
function Loading() {
  return (
    <div className=" p-4 h-screen w-full flex justify-center items-center bg-white flex-col">
      <Image src={loadingAnimation} alt="loading-animation" priority />
      <h1 className="font-semibold text-xl">Your Notes is Loading...</h1>
    </div>
  );
}

export default Loading;
