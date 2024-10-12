"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import scss from "./AdvancedSettings.module.scss";
import Navbar from "@/components/Navbar/Navbar";

interface IFormInput {
  firstName: string;
  lastName: string;
  age: number;
  defaultOption: string;
  secondOption: string;
  locationSettings: string;
  number: number;
}

const altegio = process.env.NEXT_PUBLIC_ALTEGIO;

const AdvancedSettings = () => {
  const { register, handleSubmit, reset } = useForm<IFormInput>();
  const [product, setProduct] = useState(null);
  const [isTrue, setIsTrue] = useState(false);
  const [count, setCount] = useState(0);

  const onSubmit: SubmitHandler<IFormInput> = async (formData) => {
    try {
      const updatedFormData = { ...formData, number: count };
      const response = await axios.post(`${altegio}`, updatedFormData);
      setProduct(response.data);
      console.log("Response data:", response.data);
      reset();
      setCount(0);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${altegio}`);
        setProduct(response.data);
        console.log("Fetched product:", response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchData();
  }, []);

  const handleClick = () => {
    setIsTrue((prevState) => !prevState);
    setCount(0);
  };

  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const decrementCount = () => {
    setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
  };

  return (
    <div className={scss.start}>
      <Navbar />

      <div className="container">
        <section className={scss.headerNav}>
          <div className="container">
            <p>Основные настройки</p>
            <nav className={scss.nav}>
              <Link href="/service/servicepage/advancedsettings">
                <p className={scss.headerLine}> Расширенные настройки</p>
              </Link>
              <br />
              <Link href="/service/servicepage/basicsettings">
                <p> Основные настройки</p>
              </Link>
              <br />
              <Link href="/service/servicepage/onlinebooking">
                <p>Онлайн-запись</p>
              </Link>
            </nav>
          </div>
        </section>
        <section>
          <div className="container">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={scss.form_mathers}>
                <h1 className={scss.title}>Услуга</h1>
                <div className={scss.form_inputs}>
                  <h1>Name on bill</h1>
                  <input
                    {...register("firstName", { required: true })}
                    placeholder="First Name"
                  />
                </div>

                <div className={scss.form_inputs}>
                  <h1>Taxation system</h1>
                  <select
                    {...register("defaultOption", { required: true })}
                    defaultValue="By default"
                  >
                    <option value="By default">By default</option>
                  </select>
                </div>

                <div className={scss.form_inputs}>
                  <h1>VAT</h1>
                  <select
                    {...register("secondOption", { required: true })}
                    defaultValue="By default"
                  >
                    <option value="By default">By default</option>
                  </select>
                </div>

                <div className={scss.line}></div>
                <div className={scss.box}>
                  <h2>Notifications</h2>
                  <p>
                    You can increase your revenue by reducing no-shows. Set up
                    notifications to automate customer communication.
                  </p>
                </div>
                <div className={scss.form_inputs}>
                  <h1>
                    Return visit <br /> notification
                  </h1>
                  <select
                    {...register("locationSettings", { required: true })}
                    defaultValue="Use general location settings"
                  >
                    <option value="Use general location settings">
                      Use general location settings
                    </option>
                    <option value="Do not send after the visit">
                      Do not send after the visit
                    </option>
                    <option value="1 day after the visit">
                      1 day after the visit
                    </option>
                    <option value="2 day after the visit">
                      2 days after the visit
                    </option>
                    <option value="3 day after the visit">
                      3 days after the visit
                    </option>
                  </select>
                </div>
                <div className={scss.line}></div>

                <input type="hidden" {...register("number")} value={count} />
                <div className={scss.form_buttons}>
                  <div className={scss.form_buttons_box}>
                    <div className={scss.block}>
                      <h1>Automatic debiting from memberships</h1>
                      <p>
                        If the client has an active membership, then the visit
                        will be written off automatically, <br /> if the client
                        does not cancel the visit in advance
                      </p>
                    </div>
                    <button
                      className={`${scss["toggle-switch"]} ${
                        isTrue ? scss["on"] : ""
                      }`}
                      type="button"
                      onClick={handleClick}
                    >
                      <span className={scss["toggle-knob"]}></span>
                    </button>
                  </div>
                  {!isTrue ? (
                    <></>
                  ) : (
                    <>
                      <div className={scss.form_counts}>
                        <div className={scss.form_box}>
                          <p>
                            How many hours (maximum 48) before the visit the
                            client can cancel <br /> the visit without automatic
                            debiting from their membership
                          </p>
                        </div>
                        <div className={scss.count}>
                          <button type="button" onClick={decrementCount}>
                            -
                          </button>

                          <h1>{count}</h1>

                          <button type="button" onClick={incrementCount}>
                            +
                          </button>
                        </div>
                      </div>
                    </>
                  )}

                  <div className={scss.line}></div>

                  <div className={scss.save}>
                    <button className={scss.create} type="submit">
                      create
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdvancedSettings;
