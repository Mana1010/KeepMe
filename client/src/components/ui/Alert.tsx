"use client";
import React from "react";
import Router, { useRouter } from "next/navigation";
function Alert() {
  const router = useRouter();
  function ok() {
    router.push("/login");
  }
  return (
    <div className="absolute top-0 right-0 left-0 bottom-0 w-full h-screen backdrop-blur-md flex justify-center items-center px-5 z-[9999]">
      <div className="w-full md:w-[300px] h-[130px] bg-white rounded-md px-5 py-3 border-2 relative border-slate-800 flex justify-between items-center flex-col">
        <h3 className="font-bold uppercase">Expired na imo session ID</h3>
        <button
          onClick={ok}
          className=" w-1/2 border-2 bg-black text-white py-1"
        >
          OK
        </button>
      </div>
    </div>
  );
}

export default Alert;
