"use client";
import React, { ReactNode } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
interface Children {
  children: ReactNode;
}
const queryClient = new QueryClient();
function Provider({ children }: Children) {
  return (
    <div>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </div>
  );
}

export default Provider;
