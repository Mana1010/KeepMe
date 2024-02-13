"use client";
import React from "react";
import { useState } from "react";
import { BsMenuButtonWideFill } from "react-icons/bs";
import { utilStore } from "@/store/util.store";
function Header() {
  const { openNavBar, setOpenNavbar } = utilStore();
  return (
    <div className="fixed left-0 right-0 px-3.5 top-0 w-full py-3 z-10">
      <button
        onClick={setOpenNavbar}
        className={`text-2xl ${openNavBar && "hidden"} md:hidden`}
      >
        <BsMenuButtonWideFill />
      </button>
    </div>
  );
}

export default Header;
