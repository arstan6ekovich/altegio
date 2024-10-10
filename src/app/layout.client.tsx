"use client";
import SessionProvider from "@/provider/SessionProvider";
import React, { FC, ReactNode } from "react";

interface LayoutClientType {
  children: ReactNode;
}

const LayoutClient: FC<LayoutClientType> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default LayoutClient;
