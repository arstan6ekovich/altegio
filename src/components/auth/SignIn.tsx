import React from "react";
import styles from "./SignIn.module.scss";
import Image from "next/image";
import Link from "next/link";
import loginImage from "@/assets/images/signin_img.svg";

const SignIn = () => {
  return (
    <>
      <header id={styles.Header}>
        <div className="container">
          <div className={styles.Header}>
            <Image src={loginImage} alt="img" />
            <Link href={"/auth/signin"}>Sign in</Link>
          </div>
        </div>
        <hr />
      </header>
    </>
  );
};

export default SignIn;
