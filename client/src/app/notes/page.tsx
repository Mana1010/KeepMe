"use client";
import React from "react";
import { useEffect, useState } from "react";
import Alert from "@/components/ui/Alert";
import checkToken from "@/utils/checkToken";
import { useRouter } from "next/navigation";
import { utilStore } from "@/store/store";

function page() {
  const [openAlert, setOpenAlert] = useState(false);
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
  return <div className="h-screen w-full">aaasas {openAlert && <Alert />}</div>;
}

export default page;
