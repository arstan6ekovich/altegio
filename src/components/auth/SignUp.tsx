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

interface IInputComponentProps {
  name?: string;
  placeholder?: string;
  value: string;
  handleChange: (value: string) => void;
  required?: boolean;
}

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [value, setValue] = useState("");
  const route = useRouter();

  const handlePhoneInputChange = (value: string) => {
    setValue(value);
  };

  const PhoneInputComponent = ({
    name = "phone",
    placeholder = "Phone number",
    value,
    handleChange,
  }: IInputComponentProps) => (
    <PhoneInput
      defaultCountry="kg"
      value={value}
      onChange={handleChange}
      className={"phone-input"}
      placeholder={placeholder}
    />
  );

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
        <form className={styles.form}>
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

          <PhoneInputComponent
            value={value}
            handleChange={handlePhoneInputChange}
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            className={styles.input}
            onChange={(e) => setEmail(e.target.value)}
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

          <Link href={"/service"}>
            <button
              type="submit"
              disabled={!accepted}
              className={styles.submitButton}
            >
              Sign up
            </button>
          </Link>
        </form>
      </div>
    </>
  );
};

export default SignIn;
