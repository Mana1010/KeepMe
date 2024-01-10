"use client";
import * as React from "react";
import blackIcon from "./img/keepMe-lightmode.png";
import Image from "next/image";
import { FaXmark } from "react-icons/fa6";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { MdOutlineNotes, MdOutlineManageSearch } from "react-icons/md";
import { MdFavorite, MdOutlinePersonAddAlt } from "react-icons/md";
import { CiTrash, CiLogin } from "react-icons/ci";
import { utilStore } from "../../store/store";
import { usePathname } from "next/navigation";
import { TbArrowsExchange } from "react-icons/tb";
function Sidebar() {
  const pathname = usePathname();
  const { openNavBar, setOpenNavbar, currentUser } = utilStore();
  return (
    <div
      className={`absolute h-screen md:w-[250px] w-[40%] md:relative md:shadow-md md:shadow-black/50 transition-all ease-out duration-500 ${
        openNavBar ? "left-[0]" : "left-[-100%]"
      } md:left-[0] bg-white/40 backdrop-blur-md z-50`}
    >
      <header className="px-2 flex justify-between items-center pt-2">
        <Image src={blackIcon} priority width={100} alt="icon" />
        <button
          className="text-xl text-[#120C18] md:hidden"
          onClick={setOpenNavbar}
        >
          {" "}
          <FaXmark />
        </button>
      </header>
      {pathname === "/notes" && (
        <div className="w-[90%] rounded-sm bg-black/15 sm:flex items-center px-2 py-1 h-10 mx-auto mt-3 gap-2 hidden">
          <button className="text-[#120C18] text-2xl">
            <MdOutlineManageSearch />
          </button>
          <input
            type="text"
            name="searchbox"
            placeholder="Search your Notes"
            className="bg-transparent h-full outline-none text-[#120C18]"
          />
        </div>
      )}
      <div className=" px-3.5 pt-2  text-[#120C18]">
        <small className="text-[#120C18]/80 text-[11px] font-extrabold">
          MAIN MENU
        </small>
        <ul className="flex flex-col gap-2 pt-3">
          <Link href={"/"}>
            <div
              className={`flex gap-2 w-full items-center text-[#120C18] p-2 hover:bg-[#120C18] hover:text-white active:bg-[#120C18] active:text-white font-semibold ${
                pathname === "/" && "bg-[#120C18] text-white"
              }`}
            >
              <span>
                {" "}
                <FaHome />
              </span>
              <small>HOME</small>
            </div>
          </Link>
          <Link href={"/notes"}>
            <div
              className={`flex gap-2 w-full items-center text-[#120C18] p-2 hover:bg-[#120C18] hover:text-white active:bg-[#120C18] active:text-white font-semibold ${
                pathname === "/notes" && "bg-[#120C18] text-white"
              }`}
            >
              <span>
                {" "}
                <MdOutlineNotes />
              </span>
              <small>YOUR NOTES</small>
            </div>
          </Link>
          <Link href={"/favorites"}>
            <div
              className={`flex gap-2 w-full items-center text-[#120C18] p-2 hover:bg-[#120C18] hover:text-white active:bg-[#120C18] active:text-white font-semibold ${
                pathname === "/favorites" && "bg-[#120C18] text-white"
              }`}
            >
              <span>
                {" "}
                <MdFavorite />
              </span>
              <small>FAVORITES</small>
            </div>
          </Link>
          <Link href={"/trash"}>
            <div
              className={`flex gap-2 w-full items-center text-[#120C18] p-2 hover:bg-[#120C18] hover:text-white active:bg-[#120C18] active:text-white font-semibold ${
                pathname === "/trash" && "bg-[#120C18] text-white"
              }`}
            >
              <span>
                {" "}
                <CiTrash />
              </span>
              <small>TRASH</small>
            </div>
          </Link>
        </ul>
        <small className="text-[#120C18]/80 text-[11px] font-extrabold pt-2">
          AUTHENTICATION
        </small>
        <ul className="flex flex-col gap-2 pt-3">
          <Link href={"/login"}>
            <div
              className={`flex gap-2 w-full items-center text-[#120C18] p-2 hover:bg-[#120C18] hover:text-white active:bg-[#120C18] active:text-white font-semibold ${
                pathname === "/login" && "bg-[#120C18] text-white"
              }`}
            >
              <span>
                {" "}
                <CiLogin />
              </span>
              <small>LOGIN</small>
            </div>
          </Link>
          <Link href={"/signup"}>
            <div
              className={`flex gap-2 w-full items-center text-[#120C18] p-2 hover:bg-[#120C18] hover:text-white active:bg-[#120C18] active:text-white font-semibold ${
                pathname === "/signup" && "bg-[#120C18] text-white"
              }`}
            >
              <span>
                {" "}
                <MdOutlinePersonAddAlt />
              </span>
              <small>SIGN UP</small>
            </div>
          </Link>
          <Link href={"/changepassword"}>
            <div
              className={`flex gap-2 w-full items-center text-[#120C18] p-2 hover:bg-[#120C18] hover:text-white active:bg-[#120C18] active:text-white font-semibold ${
                pathname === "/changepassword" && "bg-[#120C18] text-white"
              }`}
            >
              <span>
                {" "}
                <TbArrowsExchange />
              </span>
              <small>CHANGE PASSWORD</small>
            </div>
          </Link>
        </ul>
      </div>
      <footer className="absolute bottom-2 left-0 right-0 px-2 flex justify-center">
        <small className="text-[#120C18]">
          {currentUser
            ? `Hey, ${currentUser.username}`
            : "You are not log in yet!"}
        </small>
      </footer>
    </div>
  );
}

export default Sidebar;
