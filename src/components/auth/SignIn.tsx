"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import loginImage from "@/assets/images/signin_img.svg";
import styles from "./SignIn.module.scss";
import { usePostUserSigninMutation } from "@/redux/api/auth";
import { useRouter } from "next/navigation";

interface SigninType {
  email: string;
  password: string;
}

const SignIn = () => {
  const route = useRouter();
  const { register, handleSubmit } = useForm<SigninType>();
  const [postUserSigninMutation] = usePostUserSigninMutation();
  const onSubmit: SubmitHandler<SigninType> = async (data) => {
    try {
      const { data: responseData } = await postUserSigninMutation(data);
      localStorage.setItem("user", JSON.stringify(responseData.accessToken));
      route.push(`/service`);
    } catch (e) {
      const error = e as AxiosError;
      console.log(error.response?.data, 'data rejected');
    }
  };
  return (
    <>
      <header id={styles.Header}>
        <div className="container">
          <div className={styles.Header}>
            <Image src={loginImage} alt="img" />
            <Link href={"/auth/signup"}>Sign up</Link>
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
