"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import keepMeIcon from "./components/img/keepMe.png";
import Link from "next/link";
import { utilStore } from "@/store/util.store";
import { useRouter } from "next/navigation";
import axios from "axios";
export default function Home() {
  const { setCurrentUser } = utilStore();
  const router = useRouter();
  const { currentUser } = utilStore();
  // useEffect(() => {
  //   async function checkTokens() {
  //     const token = localStorage.getItem("userToken");
  //     if (token) {
  //       if (!(await checkToken())) {
  //         setCurrentUser();
  //         return;
  //       }
  //     }
  //   }
  //   checkTokens();
  // }, []);
  // axios.interceptors.response.use(async (res) => {});

  return (
    <main className="grid grid-cols-1 md:grid-cols-2 items-center h-screen w-full px-4">
      <div className="flex flex-col w-full justify-center items-center">
        <h1 className="text-[#120C18] font-extrabold md:text-[5rem] text-[4rem]">
          KeepMe
        </h1>
        <p className="text-lg italic text-[#120C18] text-center">
          Effortless Note-taking, Anytime, Anywhere with KeepMe.
        </p>
        <button
          className="mt-2 w-[70%] text-white bg-[#120C18] h-[45px]"
          onClick={() => {
            if (currentUser) {
              router.push("/notes");
            } else {
              router.push(
                "/login?" +
                  new URLSearchParams({ message: "You are not login yet!" })
              );
            }
          }}
        >
          ADD YOUR NOTES
        </button>
        <div>
          <small className="text=[#120C18]">No Account Yet?</small>{" "}
          <Link href={"/signup"}>
            <small className="text-blue-700 underline decoration-blue-700">
              Signup Here
            </small>
          </Link>
        </div>
      </div>
      <Image
        src={keepMeIcon}
        alt="keepMe"
        priority
        className="mx-auto w-[350px] sm:w-[400px] md:w-full"
      />
    </main>
  );
}
