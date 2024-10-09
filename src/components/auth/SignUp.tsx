"use client";
import { useState } from "react";
// @ts-ignore
import InputMask from "react-input-mask";
import styles from "./SignUp.module.scss";

const SignIn = () => {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [accepted, setAccepted] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h1>Registration</h1>
        <label htmlFor="phone">Mobile phone</label>
        <InputMask
          mask="+996 999-999-999"
          value={phone}
          onChange={handlePhoneChange}
        >
          {() => <input id="phone" type="tel" className={styles.input} />}
        </InputMask>
        <small>This number will be used as your login</small>

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          className={styles.input}
        />
        <small>Password will be sent to this email</small>

        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            id="accept"
            checked={accepted}
            onClick={() => setAccepted(!accepted)}
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

        <button
          type="submit"
          disabled={!accepted}
          className={styles.submitButton}
        >
          Sign up
        </button>
      </form>
    </div>
  );
};

export default SignIn;
