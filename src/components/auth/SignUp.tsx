"use client";
import { useState } from "react";
// @ts-ignore
import styles from "./SignUp.module.scss";
import { PhoneInput, defaultCountries } from "react-international-phone";
import "react-international-phone/style.css";
import registerImage from "@/assets/images/signin_img.svg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";

interface IInputComponentProps {
  email: string;
  password: string;
  username: string;
  photo: string;
}

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [value, setValue] = useState("");
  const route = useRouter();
  const { register, handleSubmit, reset } = useForm<IInputComponentProps>();

  const PhoneInputComponent = ({}: IInputComponentProps) => (
    <PhoneInput defaultCountry="kg" value={value} className={"phone-input"} />
  );

  const onSubmit: SubmitHandler<IInputComponentProps> = async (data) => {
    try {
      const { data: responseData } = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/auth/sign-up`,
        data
      );
      console.log(responseData);
      reset();
      alert("Пользователь успешно за регицтраван");
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
            <Image src={registerImage} alt="img" />
            <Link href={"/auth/signin"}>Sign in</Link>
          </div>
        </div>
        <hr />
      </header>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <h1>Registration</h1>
          {/* <label htmlFor="phone">Mobile phone</label>
        <InputMask
          mask="+996 999-999-999"
          value={phone}
          onChange={handlePhoneChange}
        >
          {() => <input id="phone" type="tel" className={styles.input} />}
        </InputMask> */}
          <small>This number will be used as your login</small>

          {/* <PhoneInputComponent {...register("email", { required: true })} /> */}

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
            className={styles.input}
          />
          <input
            id="email"
            type="text"
            placeholder="Password"
            className={styles.input}
            {...register("password", { required: true })}
          />
          <input
            id="email"
            type="text"
            placeholder="UserName"
            className={styles.input}
            {...register("username", { required: true })}
          />
          <input
            id="email"
            type="text"
            placeholder="User Photo"
            className={styles.input}
            {...register("photo", { required: true })}
          />
          <small>Password will be sent to this email</small>

          <div className={styles.checkboxContainer}>
            <input
              type="checkbox"
              id="accept"
              checked={accepted}
              onChange={() => setAccepted(!accepted)}
            />
            <label htmlFor="accept">
              I accept the{" "}
              <a href="/terms" target="_blank">
                terms of the user agreement
              </a>{" "}
              and{" "}
              <a href="/privacy" target="_blank">
                agree to Privacy Policy
              </a>
            </label>
          </div>

          <button type="submit" className={styles.submitButton}>
            Sign up
          </button>
        </form>
      </div>
    </>
  );
};

export default SignIn;
