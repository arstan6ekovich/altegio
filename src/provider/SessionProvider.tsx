"use client";
import { store } from "@/redux/store";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import React, { FC, ReactNode, useEffect, useState } from "react";
import { Provider } from "react-redux";

interface SessionType {
  children: ReactNode;
}

const SessionProvider: FC<SessionType> = ({ children }) => {;

  return <Provider store={store}>{children}</Provider>;
};

export default SessionProvider;
