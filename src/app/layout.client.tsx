"use client";
import ReduxProvider from "@/provider/ReduxProvider";
import { SessionProvider } from "@/provider/SessionProvider";
import React, { FC, ReactNode } from "react";

interface LayoutClientType {
  children: ReactNode;
}

const LayoutClient: FC<LayoutClientType> = ({ children }) => {
  return (
    <ReduxProvider>
      <SessionProvider>{children}</SessionProvider>
    </ReduxProvider>
  );
};

export default LayoutClient;
