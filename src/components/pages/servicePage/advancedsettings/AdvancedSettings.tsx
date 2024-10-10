"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import scss from "./AdvancedSettings.module.scss";

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
    <>
      <section>
        <div className="container">
          расширенные настройки
          <br />
          <Link href="/service/servicepage/advancedsettings">
            расширенные-настройки
          </Link>
          <br />
          <Link href="/service/servicepage/basicsettings">
            основные настройки
          </Link>
          <br />
          <Link href="/service/servicepage/onlinebooking">Онлайн-запись</Link>
        </div>
      </section>

      <section>
        <div className="container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={scss.form_mathers}>
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
              <div className={scss.form_inputs}>
                <h1>Return visit notification</h1>
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
              <input type="hidden" {...register("number")} value={count} />
              <div className={scss.form_buttons}>
                <button type="button" onClick={handleClick}>
                  {" "}
                  add{" "}
                </button>
                {!isTrue ? (
                  <h1>Automatic debiting from memberships</h1>
                ) : (
                  <>
                    <div className={scss.form_counts}>
                      <h1>Automatic debiting from memberships</h1>
                      <div className={scss.count}>
                        <button type="button" onClick={incrementCount}>
                          +
                        </button>
                        <h1>{count}</h1>
                        <button type="button" onClick={decrementCount}>
                          -
                        </button>
                      </div>
                    </div>
                  </>
                )}
                <button type="submit">create</button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default AdvancedSettings;
