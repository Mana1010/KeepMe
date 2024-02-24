"use client";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { PiBellSimpleRinging } from "react-icons/pi";
import { FaRegTrashAlt } from "react-icons/fa";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import Loading from "@/components/ui/Loading";
import { motion } from "framer-motion";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { useQueryClient } from "@tanstack/react-query";
import { LiaTrashAlt, LiaTrashRestoreAltSolid } from "react-icons/lia";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdInfoOutline as CiCircleInfo } from "react-icons/md";
import { NoteData } from "../notes/page";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
interface NoteTrashData extends NoteData {
  createdTrashAt: string;
}
function Trash() {
  const queryClient = useQueryClient();
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
  const deleteAllTrash = useMutation({
    mutationFn: async () => {
      const response = await axios.delete(
        "http://localhost:5000/user/trashes",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
          withCredentials: true,
        }
      );
      return response.data.message;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries();
      toast.success(data);
    },
    onError: (err: any) => {
      toast.error(err.response.data.message);
    },
  });
  const deleteTrash = useMutation({
    mutationFn: async (data: NoteTrashData) => {
      const response = await axios.delete(
        `http://localhost:5000/user/trashes/${data.noteId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
          withCredentials: true,
        }
      );
      return response.data.message;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries();
      toast.success(data);
    },
    onError: (err: any) => {
      toast.error(err.response.data.message);
    },
  });
  const restoreNote = useMutation({
    mutationFn: async (data: NoteTrashData) => {
      const response = await axios.delete(
        `http://localhost:5000/user/trashes/restore/${data.noteId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
          withCredentials: true,
        }
      );
      return response.data.message;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries();
      toast.success(data);
    },
    onError: (err: any) => {
      toast.error(err.response.data.message);
    },
  });
  const [searchTrash, setSearchedTrash] = useState<string>("");
  if (getTrash.isLoading) {
    return <Loading>Your Trash is Loading...</Loading>;
  }
  if (getTrash.isError) {
    toast.error(getTrash.error.message);
  }
  const dateFormatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "full",
    timeStyle: "short",
  });
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
          <div className="flex justify-between items-center w-full border-[1px] border-[#E5E7EB] px-2.5 py-3">
            <div className="flex items-center gap-2">
              <span>
                <PiBellSimpleRinging />
              </span>
              <p className="text-[0.87rem]">
                Your trash will be automatically deleted permanently after 7
                days
              </p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger>
                {" "}
                <button
                  disabled={getTrash.data.length === 0}
                  className="text-sm px-6 py-2 bg-[#2E2E2E] lg:block hidden text-white rounded-lg disabled:bg-slate-400"
                >
                  Empty Trash
                </button>
                <button
                  disabled={getTrash.data.length === 0}
                  className="text-lg px-4 py-2 bg-[#101012] lg:hidden block text-white rounded-lg disabled:bg-slate-400"
                >
                  <MdOutlineDeleteSweep />
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-[#101012] text-white">
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to delete{" "}
                    {getTrash.data.length <= 1 ? "this" : "these"}{" "}
                    {getTrash.data.length}{" "}
                    {getTrash.data.length <= 1 ? "note" : "notes"}?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    all your trash and remove your trash from our database.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => deleteAllTrash.mutate()}
                    className="bg-[#1E1C1D]"
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        {getTrash.data?.length === 0 ? (
          <div className="space-y-4 flex flex-col justify-center items-center h-full">
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
            {getTrash.data?.map((notes: NoteTrashData) => (
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
                  <div className="space-x-2">
                    <button
                      onClick={() => restoreNote.mutate(notes)}
                      className={`hidden md:inline text-lg 
                      `}
                    >
                      <LiaTrashRestoreAltSolid />
                    </button>
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <button
                          className="hidden md:inline text-lg"

                          // onClick={() => deleteNote.mutate(filteredNote)}
                        >
                          <LiaTrashAlt />
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-[#101012] text-white">
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you sure you want to delete this trash?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone.{" "}
                            <span className="font-bold">{notes.title}</span>{" "}
                            will be deleted permanently.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteTrash.mutate(notes)}
                            className="bg-[#1E1C1D]"
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                    <Popover>
                      <PopoverTrigger>
                        <button className="hidden md:inline text-lg">
                          <CiCircleInfo />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="bg-[#0A0F13] text-white w-[400px] z-50 flex flex-col">
                        <h1>NOTE DETAILS</h1>
                        <small>
                          <span>CREATED AT:</span>{" "}
                          {dateFormatter.format(new Date(notes.createdAt))}
                        </small>
                        <small>
                          <span>UPDATED AT:</span>{" "}
                          {dateFormatter.format(new Date(notes.updatedAt))}
                        </small>
                        <small>
                          <span>DELETED AT:</span>{" "}
                          {dateFormatter.format(new Date(notes.createdTrashAt))}
                        </small>
                      </PopoverContent>
                    </Popover>
                  </div>
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
