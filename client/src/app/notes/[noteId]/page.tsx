"use client";
import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
interface Param {
  params: {
    noteId: string;
  };
}

function Note({ params }: Param) {
  const editNote = useMutation({
    mutationFn: async (data) => {
      const response = await axios.patch(
        `http://localhost:5000/user/notes/${params.noteId}`,
        data,
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
      toast.success(data);
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return <div></div>;
}

export default Note;
