"use client";
import { store } from "@/redux/store";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import React, { FC, ReactNode, useEffect, useState } from "react";
import { Provider } from "react-redux";

interface SessionType {
  children: ReactNode;
}

const SessionProvider: FC<SessionType> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [status, setStatus] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API}/auth/user`
        );
        if (response.status === 200) {
          setStatus("fulfilled");
        } else {
          setStatus("rejected");
        }
      } catch (e) {
        console.log(e);
        setStatus("rejected");
      }
    }
    fetchUser();
  }, []);

  const handleNavigation = () => {
    switch (pathname) {
      case "/auth/signin":
      case "/auth/signup":
        if (status === "fulfilled") {
          router.push("/");
        }
        break;
      case "/":
      case "/profile":
        if (status === "rejected") {
          router.push("/auth/signin");
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    handleNavigation();
  }, [status, pathname, router]);

  return <Provider store={store}>{children}</Provider>;
};

export default SessionProvider;
