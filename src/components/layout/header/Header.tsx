"use client";
import Image from "next/image";
import scss from "./Header.module.scss";
import header_logo from "@/assets/images/header-logo.webp";
import Link from "next/link";
import { MdLanguage } from "react-icons/md";
import { GoChevronDown } from "react-icons/go";
import { GoChevronUp } from "react-icons/go";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Header = () => {
  const [language, setLanguage] = useState<boolean>(false);
  const route = useRouter();
  return (
    <header
      id={scss.Header}
      style={{
        transition: "0.2s",
        height: !language ? "40px" : "200px",
      }}
    >
      <div className="container">
        <div className={scss.Header}>
          <div className={scss.Header_left}>
            <Image quality={100} src={header_logo} alt="img" />
            <Link href={"/"}>Platform</Link>
            <Link href={"/"}>Resources</Link>
            <Link href={"/"}>Blog</Link>
            <Link href={"/"}>Platform</Link>
          </div>
          <div className={scss.Header_right}>
            <button
              className={scss.language}
              onClick={() => setLanguage(!language)}
            >
              <MdLanguage />
              {language ? <GoChevronUp /> : <GoChevronDown />}
            </button>
            <button
              className={scss.sign_in}
              onClick={() => route.push("/auth/signin")}
            >
              SIGN IN
            </button>
            <button
              className={scss.try_days}
              onClick={() => route.push("/auth/signup")}
            >
              TRY 7 DAYS FREE
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
