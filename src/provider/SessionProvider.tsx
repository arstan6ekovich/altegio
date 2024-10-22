import { FC, ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useGetUserAuthQuery } from "@/redux/api/auth";

interface SessionProviderProps {
  children: ReactNode;
}

export const SessionProvider: FC<SessionProviderProps> = ({ children }) => {
  const { status } = useGetUserAuthQuery();
  const pathname = usePathname();
  const router = useRouter();
  console.log(status);

  const handleNavigation = () => {
    switch (pathname) {
      case "/auth/signin":
      case "/auth/signup":
      case "/service":
        if (status === "fulfilled") {
          router.push("/service");
        }
        break;
      case "/service/servicepage/advancedsettings":
      case "/service/servicepage/basicsettings":
      case "/service/servicepage/onlinebooking":
      case "/service":
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
  return children;
};
