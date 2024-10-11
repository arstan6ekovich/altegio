"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import scss from "./BasicSettings.module.scss";

interface IFormInput {
  haircut: string;
  defaultOption: string;
  num: number;
  hour: string;
  minute: string;
  number: number;
  from?: number;
  to?: number;
}

const basic = process.env.NEXT_PUBLIC_BASIC;

const BasicSettings = () => {
  const { register, handleSubmit, reset } = useForm<IFormInput>();
  const [product, setProduct] = useState([]);
  const [showRangeInput, setShowRangeInput] = useState(false);
  const [showMembershipDebit, setShowMembershipDebit] = useState(false);
  const [count, setCount] = useState(0);

  const onSubmit: SubmitHandler<IFormInput> = async (formData) => {
    try {
      const dataToSend = {
        ...formData,
        number: count,
        range: showRangeInput ? `${formData.from}-${formData.to}` : undefined,
      };

      if (!showRangeInput) {
        delete dataToSend.from;
        delete dataToSend.to;
      }

      const { data } = await axios.post(`${basic}`, dataToSend);
      setProduct(data);
      console.log(data, "data");

      reset({
        haircut: "",
        defaultOption: "By default",
        num: 0,
        hour: "1h",
        minute: "1m",
        number: count,
        from: undefined,
        to: undefined,
      });

      setCount(0);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${basic}`);
        setProduct(response.data);
        console.log("Fetched product:", response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <section>
        <div className="container">
          <p>Основные настройки</p>
          <nav>
            <Link href="/service/servicepage/advancedsettings">
              Расширенные настройки
            </Link>
            <br />
            <Link href="/service/servicepage/basicsettings">
              Основные настройки
            </Link>
            <br />
            <Link href="/service/servicepage/onlinebooking">Онлайн-запись</Link>
          </nav>
        </div>
      </section>

      <section>
        <div className="container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={scss.form_mathers}>
              <div className={scss.form_inputs}>
                <label htmlFor="haircut">Name</label>
                <input
                  id="haircut"
                  {...register("haircut", { required: true })}
                  placeholder="e.g. Haircut"
                />
              </div>

              <div className={scss.form_inputs}>
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  {...register("defaultOption", { required: true })}
                  defaultValue="By default"
                >
                  <option value="By default">By default</option>
                </select>
              </div>

              <div className={scss.form_buttons}>
                {!showRangeInput ? (
                  <input
                    {...register("num", { required: true })}
                    type="number"
                    placeholder="Number"
                    defaultValue="0"
                  />
                ) : (
                  <div className={scss.form_counts}>
                    <input
                      {...register("from", { required: showRangeInput })}
                      type="number"
                      placeholder="From"
                      defaultValue="0"
                    />
                    <input
                      {...register("to", { required: showRangeInput })}
                      type="number"
                      placeholder="To"
                      defaultValue="0"
                    />
                  </div>
                )}
                <input
                  type="radio"
                  onClick={() => setShowRangeInput(!showRangeInput)}
                />
              </div>

              <div className={scss.form_inputs}>
                <label htmlFor="hour">Hour</label>
                <select
                  id="hour"
                  {...register("hour", { required: true })}
                  defaultValue="1h"
                >
                  <option value="1h">1h</option>
                  <option value="2h">2h</option>
                </select>

                <label htmlFor="minute">Minute</label>
                <select id="minute" {...register("minute", { required: true })}>
                  <option value="1m">1 minute</option>
                  <option value="2m">2 minutes</option>
                </select>
              </div>

              <input type="hidden" {...register("number")} value={count} />
              <div className={scss.form_buttons}>
                <input
                  type="radio"
                  onClick={() => setShowMembershipDebit(!showMembershipDebit)}
                />
                {showMembershipDebit && (
                  <div className={scss.form_counts}>
                    <h1>Automatic debiting from memberships</h1>
                    <div className={scss.count}>
                      <button
                        type="button"
                        onClick={() => setCount((c) => c + 1)}
                      >
                        +
                      </button>
                      <h1>{count}</h1>
                      <button
                        type="button"
                        onClick={() => setCount((c) => (c > 0 ? c - 1 : 0))}
                      >
                        -
                      </button>
                    </div>
                  </div>
                )}
                <h1>Automatic debiting from memberships</h1>
                <button type="submit">Create</button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default BasicSettings;
