"use client";
import React from "react";
import { useEffect, useState } from "react";
import Alert from "@/components/ui/Alert";
import checkToken from "@/utils/checkToken";
import { useRouter } from "next/navigation";
import { utilStore } from "@/store/store";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function Notes() {
  const [openAlert, setOpenAlert] = useState(false);
  const router = useRouter();
  const { setCurrentUser } = utilStore();
  useEffect(() => {
    async function checkTokens() {
      const token = localStorage.getItem("userToken");
      if (token) {
        if (!(await checkToken())) {
          setOpenAlert(true);
          setCurrentUser();
          return;
        }
      } else {
        router.push(
          `/login?${new URLSearchParams({
            message: "You are not log in yet!",
          })}`
        );
      }
    }
    checkTokens();
  }, []);
  return (
    <div className="h-screen w-full px-4 py-2 relative">
      <h2 className="text-black text-[2.5rem] md:pt-0 pt-[35px] font-bold">
        MY NOTES
      </h2>
      <div className="w-full rounded-md h-[45px] flex shadow shadow-black mt-2 gap-2 items-center px-2">
        <label htmlFor="search" className=" text-xl px-1">
          {" "}
          <CiSearch />
        </label>
        <input
          autoComplete="false"
          id="search"
          type="text"
          placeholder="Search your Notes"
          className="outline-none bg-transparent caret-black w-[95%]"
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              {" "}
              <button className="absolute right-[20px] bottom-[20px] rounded-full w-[50px] h-[50px] bg-black flex justify-center items-center animate-bounce">
                <span className="text-white">
                  {" "}
                  <FaPlus />
                </span>
              </button>
            </TooltipTrigger>
            <TooltipContent className="bottom-[-500px] right-[50px] w-[130px] absolute">
              <p className="text-center">Add your Notes</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {openAlert && <Alert />}
    </div>
  );
}

export default Notes;
