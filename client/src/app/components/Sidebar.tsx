"use client";
import { useEffect, useState } from "react";
import blackIcon from "./img/keepMe-lightmode.png";
import Image from "next/image";
import { FaXmark } from "react-icons/fa6";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { MdOutlineNotes, MdOutlineManageSearch } from "react-icons/md";
import { MdFavorite, MdOutlinePersonAddAlt } from "react-icons/md";
import { CiTrash, CiLogin } from "react-icons/ci";
import { utilStore } from "@/store/store";
import { usePathname } from "next/navigation";
import { TbArrowsExchange } from "react-icons/tb";
import { State } from "@/store/store";
import Skeleton from "@/components/ui/Skeleton";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "usehooks-ts";
function Sidebar() {
  // const { data, isLoading } = useQuery({
  //   queryKey: ["user"],
  //   queryFn: async () => {

  //   }
  // });
  const router = useRouter();
  const pathname = usePathname();
  const { openNavBar, setOpenNavbar, currentUser, setCurrentUser, logOut } =
    utilStore() as State;
  const [loading, isLoading] = useState(false);
  const matches = useMediaQuery("(min-width: 640px)");
  useEffect(() => {
    async function fetchData() {
      try {
        isLoading(true);
        await setCurrentUser();
      } catch (err) {
        console.log(err);
      } finally {
        isLoading(false);
      }
    }
    fetchData();
  }, []);
  async function logOutMe() {
    try {
      logOut();
      toast.success("Successfully Logout", {
        position: matches ? "bottom-right" : "top-center",
      });
      router.push("/login");
    } catch (err) {
      toast.error("Successfully Logout", {
        position: matches ? "bottom-right" : "top-center",
      });
    }
  }
  return (
    <div
      className={`absolute h-screen md:w-[270px] w-[70%] sm:w-[50%] md:static md:shadow-md md:shadow-black/50 transition-all ease-out duration-500 ${
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
              <small>MY NOTES</small>
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
      <footer className="absolute bottom-2 left-0 right-0 px-2 flex justify-center flex-col items-center gap-2">
        {loading ? (
          <Skeleton />
        ) : (
          <small className="text-[#120C18]">
            {currentUser?.email ? currentUser.email : "You are not login yet!"}
          </small>
        )}
        {loading ? (
          <Skeleton />
        ) : (
          currentUser && (
            <button
              onClick={logOutMe}
              className="w-full bg-black text-white rounded-sm py-1.5 border-none flex gap-1 items-center justify-center"
            >
              LOGOUT
            </button>
          )
        )}
      </footer>
    </div>
  );
}

export default Sidebar;
