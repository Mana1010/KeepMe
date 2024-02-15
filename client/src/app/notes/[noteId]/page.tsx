"use client";
import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
interface Param {
  params: {
    noteId: string;
  };
}
const getNote = useQuery({
  queryKey: ["noteId"],
  queryFn: async () => {},
});
function Note({ params }: Param) {
  return <div></div>;
}

export default Note;
