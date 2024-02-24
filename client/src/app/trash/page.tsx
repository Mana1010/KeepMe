"use client";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PiBellSimpleRinging } from "react-icons/pi";
import { FaXmark } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import Loading from "@/components/ui/Loading";
import { motion } from "framer-motion";
import { MdOutlineDeleteSweep } from "react-icons/md";

function Trash() {
  const getTrash = useQuery({
    queryKey: ["trash"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:5000/user/trashes", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        withCredentials: true,
      });
      return response.data.message;
    },
  });
  const [searchTrash, setSearchedTrash] = useState<string>("");
  const [removeReminder, setRemoveReminder] = useState(false);
  if (getTrash.isLoading) {
    return <Loading>Your Trash is Loading...</Loading>;
  }
  if (getTrash.isError) {
    toast.error(getTrash.error.message);
  }
  return (
    <div className="w-full h-screen px-3 relative">
      <div className="w-full rounded-md h-[45px] shadow shadow-black mt-[3rem] md:mt-[1.5rem] gap-2 flex items-center px-2 relative z-10">
        <label htmlFor="search" className=" text-xl px-1">
          {" "}
          <CiSearch />
        </label>
        <input
          onChange={(e) => {
            setSearchedTrash((prev) => e.target.value);
          }}
          value={searchTrash as string}
          autoComplete="off"
          id="search"
          type="text"
          placeholder="Search your Trash"
          className="outline-none bg-transparent caret-black w-[95%]"
        />
      </div>
      <div className="w-full h-[72%] md:h-[76%] oveflow-y-auto">
        <div className="py-1.5">
          <div
            style={{ display: removeReminder ? "none" : "" }}
            className="flex justify-between items-center w-full border-[1px] border-[#E5E7EB] px-2.5 py-3"
          >
            <div className="flex items-center gap-2">
              <span>
                <PiBellSimpleRinging />
              </span>
              <p className="text-[0.87rem]">
                Your trash will be automatically deleted after 7 days
              </p>
            </div>
            <button
              onClick={() => setRemoveReminder((prev) => !prev)}
              className="text-sm px-6 py-2 bg-[#2E2E2E] lg:block hidden text-white rounded-lg"
            >
              Empty Trash
            </button>
            <button className="text-lg px-4 py-2 bg-[#2E2E2E] lg:hidden block text-white rounded-lg">
              <MdOutlineDeleteSweep />
            </button>
          </div>
        </div>
        {getTrash.data?.length === 0 ? (
          <div className="space-y-4 flex flex-col justify-center items-center">
            <span className="text-slate-400 text-[5rem]">
              {<FaRegTrashAlt />}
            </span>
            <h1 className="text-2xl text-[#BFC8D4] font-bold">NO TRASH</h1>
          </div>
        ) : (
          <div
            id="notes"
            className="overflow-y-auto grid w-full h-full grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 justify-center items-center py-3"
          >
            {" "}
            {getTrash.data?.map((notes: any) => (
              <motion.div
                layout
                key={notes._id}
                style={{ backgroundColor: notes.bgColor }}
                className="border-[1px] border-[#e0e0e0] h-[380px] rounded-md px-3 py-2 relative hover:shadow-xl shadow-black transition-shadow ease-in duration-200"
              >
                <header className="flex justify-between items-center w-full">
                  <h3 className="font-extrabold text-sm">{notes.title}</h3>
                </header>
                <div
                  style={{
                    overflowWrap: "break-word",
                    fontWeight: notes.isBold ? "900" : "normal",
                    fontStyle: notes.isItalic ? "italic" : "normal",
                  }}
                  className=" pt-5 h-[87%] overflow-hidden"
                >
                  <p
                    style={{
                      whiteSpace: "pre-line",
                      fontWeight: notes.isBold ? "bold" : "normal",
                    }}
                    className="text-sm"
                  >
                    {notes.content}
                  </p>
                </div>
                <footer className="flex justify-between items-center pt-1.5 absolute bottom-1 right-0 left-0 w-full px-2.5">
                  <small>{notes.createdAt.slice(0, 10)}</small>
                  <div
                    className="space-x-2"
                    onClick={(e) => e.stopPropagation()}
                  ></div>
                  <div
                    className="md:hidden flex"
                    onClick={(e) => e.stopPropagation()}
                  ></div>
                </footer>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Trash;
