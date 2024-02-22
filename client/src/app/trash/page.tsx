"use client";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PiBellSimpleRinging } from "react-icons/pi";
import { FaXmark } from "react-icons/fa6";

function Trash() {
  const [searchTrash, setSearchedTrash] = useState<string>("");
  const [removeReminder, setRemoveReminder] = useState(false);
  return (
    <div className="w-full h-screen px-3">
      <div className="w-full rounded-md h-[45px] flex shadow shadow-black mt-[3rem] md:mt-[1.5rem] gap-2 items-center px-2 relative z-10">
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
      <div className="pt-2">
        <Alert style={{ display: removeReminder ? "none" : "" }}>
          <div className="flex items-center gap-2">
            <span>
              <PiBellSimpleRinging />
            </span>
            <AlertDescription>
              Your trash will be automatically deleted after 7 days
            </AlertDescription>
          </div>
          <button onClick={() => setRemoveReminder((prev) => !prev)}>
            <FaXmark />
          </button>
        </Alert>
      </div>
    </div>
  );
}

export default Trash;
