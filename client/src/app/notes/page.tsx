"use client";
import React from "react";
import { useEffect, useState } from "react";
import Alert from "@/components/ui/Alert";
import checkToken from "@/utils/checkToken";
import { useRouter } from "next/navigation";
import { utilStore } from "@/store/store";
import { CiSearch } from "react-icons/ci";
import { FaPlus, FaCirclePlus } from "react-icons/fa6";
import { Tooltip } from "react-tooltip";
import AddNote from "../components/Notes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { UserNote } from "@/store/note.store";
import { TbNotes } from "react-icons/tb";
import { LuPin } from "react-icons/lu";
import Loading from "@/components/ui/Loading";
import { PiPushPinSlashLight } from "react-icons/pi";
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
    return <Loading />;
  }
  const checkIsPinned = data?.some((user) => user.isPinned);
  const filterNotePinned = data?.filter((user) => user.isPinned);
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
        {data?.length === 0 ? (
          <div className="flex justify-center items-center flex-col w-full h-full space-y-2">
            <h1 className="font-bold text-slate-400 text-3xl text-center">
              YOU HAVE NO NOTES
            </h1>
            <div className="space-x-2 ">
              <h1 className="flex items-center gap-2 text-slate-400 text-xl">
                Click the{" "}
                <span>
                  <FaCirclePlus />
                </span>
                to add note
              </h1>
            </div>
          </div>
        ) : (
          <div
            id="note-with-pin-container"
            className={`${checkIsPinned && "overflow-y-auto"} w-full h-full`}
          >
            <div className={`${!checkIsPinned && "hidden"} p-2`}>
              <h6 className="font-semibold text-slate-700 text-[13px]">
                PINNED
              </h6>
              <div className="w-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 pb-3 pt-1 relative">
                {filterNotePinned?.map((filteredNote) => (
                  <div
                    key={filteredNote._id}
                    style={{ backgroundColor: filteredNote.bgColor }}
                    className="border-[1px] border-[#e0e0e0] h-[380px] rounded-md px-3 py-2 relative"
                  >
                    <button className="absolute w-6 h-6 rounded-full bg-black text-white flex justify-center items-center right-[-10px] top-[-7px]">
                      <PiPushPinSlashLight />
                    </button>
                    <header>
                      <h3 className="font-extrabold text-sm">
                        {filteredNote.title}
                      </h3>
                    </header>
                    <div
                      style={{ overflowWrap: "break-word" }}
                      className=" pt-5 h-[93%] overflow-hidden"
                    >
                      <p
                        style={{
                          whiteSpace: "pre-line",
                          fontWeight: filteredNote.isBold ? "bold" : "normal",
                        }}
                        className="text-sm"
                      >
                        {filteredNote.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div
              id="notes"
              className={`${
                !checkIsPinned && "overflow-y-auto"
              } w-full h-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 `}
            >
              {data?.map((notes: NoteData) => (
                <div
                  key={notes._id}
                  style={{ backgroundColor: notes.bgColor }}
                  className="border-[1px] border-[#e0e0e0] h-[380px] rounded-md px-3 py-2 relative"
                >
                  <header className="flex justify-between items-center w-full">
                    <h3 className="font-extrabold text-sm">{notes.title}</h3>
                    <button onClick={() => {}} className=" text-black">
                      <LuPin />
                    </button>
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
                      {notes.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
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
