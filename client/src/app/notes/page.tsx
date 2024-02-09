"use client";
import React from "react";
import { useEffect, useState } from "react";
import Alert from "@/components/ui/Alert";
import checkToken from "@/utils/checkToken";
import { useRouter } from "next/navigation";
import { utilStore } from "@/store/store";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { Tooltip } from "react-tooltip";
import AddNote from "../components/Notes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { UserNote } from "../components/Notes";
import { TbNotes } from "react-icons/tb";

export interface NoteData extends UserNote {
  _id: string;
  createdBy: string;
  udpdatedAt: string;
  createdAt: string;
  owner?: string;
}
function Notes() {
  const [openAlert, setOpenAlert] = useState(false);
  const [addNote, setAddNote] = useState(false);
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
  const {
    isError,
    error,
    isLoading,
    isFetching,
    data,
  }: {
    isError: boolean;
    error: any;
    isLoading: boolean;
    isFetching: boolean;
    data?: NoteData[];
  } = useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:5000/user/notes", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        withCredentials: true,
      });
      return response.data.message;
    },
  });
  if (isError) {
    toast.error(error.response.data.message);
  }
  if (isLoading) {
    return <h1>Loading.....</h1>;
  }

  return (
    <div className="h-screen w-full px-4 py-2 relative">
      <div className="flex justify-between items-center w-full md:pt-0 pt-[35px]">
        <h2 className="text-black text-[2.5rem] font-bold">MY NOTES</h2>
        <div className="flex gap-2">
          <div className="flex space-x-2 items-center shadow-md px-1.5 rounded-md">
            <span className="text-lg">
              <TbNotes />
            </span>
            <h5 className="font-bold">{data?.length}</h5>
          </div>
        </div>
      </div>
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
      </div>{" "}
      <div className=" w-full h-[76%] md:h-[81%] pt-1">
        <div
          id="notes"
          className="overflow-y-auto w-full h-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 "
        >
          {data?.map((notes: NoteData) => (
            <div
              style={{ backgroundColor: notes.bgColor }}
              className="border-[1px] border-[#e0e0e0] h-[380px] rounded-md px-4 py-2 "
            >
              <header>
                <h3 className="font-extrabold text-sm">{notes.title}</h3>
              </header>
              <div
                style={{ overflowWrap: "break-word" }}
                className=" pt-5 h-[93%] overflow-hidden"
              >
                <p
                  style={{
                    whiteSpace: "pre-line",
                    fontWeight: notes.isBold ? "bold" : "normal",
                  }}
                  className="text-sm"
                >
                  {notes.content.replace("/\n/g", "\n")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={() => {
          setAddNote((prev) => !prev);
        }}
        className="absolute right-[20px] bottom-[20px] rounded-full w-[50px] h-[50px] bg-black flex justify-center items-center animate-bounce"
      >
        <span className="text-white">
          {" "}
          <FaPlus />
        </span>
      </button>
      {addNote && <AddNote setAddNote={setAddNote} />}
      {openAlert && <Alert />}
    </div>
  );
}

export default Notes;
