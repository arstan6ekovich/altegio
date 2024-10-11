"use client"
import React from "react";
import styles from "./SignIn.module.scss";
import Image from "next/image";
import Link from "next/link";
import loginImage from "@/assets/images/signin_img.svg";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const route = useRouter();
  return (
    <>
      <header id={styles.Header}>
        <div className="container">
          <div className={styles.Header}>
            <Image src={loginImage} alt="img" />
            <Link href={"/auth/signup"}>Sign in</Link>
          </div>
        </div>
        <hr />
      </header>
      <section id={styles.signin}>
        <div className="container">
          <div className={styles.signin}>
            <h1>Вход</h1>
            <span>Номер телефона или Email</span>
            <input type="text" />
            <span>Пароль</span>
            <input type="text" />
            <div className={styles.sigin_password}>
              <div className={styles.signin_poc}>
                <input type="checkbox" />
                <span>показать пароль</span>
              </div>
              <h4>Не помню пароль</h4>
            </div>
            <button onClick={() => route.push("/service")}>Войти</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignIn;
