"use client";
import React from "react";
import styles from "./SignIn.module.scss";
import Image from "next/image";
import Link from "next/link";
import loginImage from "@/assets/images/signin_img.svg";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";

interface SigninType {
  email: string;
  password: string;
}

const SignIn = () => {
  const route = useRouter();
  const { register, handleSubmit } = useForm<SigninType>();
  const onSubmit: SubmitHandler<SigninType> = async (data) => {
    try {
      const { data: responseData } = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/auth/sign-in`,
        data
      );
      localStorage.setItem("user", JSON.stringify(responseData.accessToken));
      route.push(`/service`);
    } catch (e) {
      const error = e as AxiosError;
      console.log(error.response?.data);
    }
  };
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1>Вход</h1>
              <span>Номер телефона или Email</span>
              <input type="text" {...register("email", { required: true })} />
              <span>Пароль</span>
              <input
                type="text"
                {...register("password", { required: true })}
              />
              <div className={styles.sigin_password}>
                <div className={styles.signin_poc}>
                  <input type="checkbox" />
                  <span>показать пароль</span>
                </div>
                <h4>Не помню пароль</h4>
              </div>
              <button type="submit">Войти</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignIn;
