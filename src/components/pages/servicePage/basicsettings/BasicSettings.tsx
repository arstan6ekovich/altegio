"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import scss from "./BasicSettings.module.scss";
import Navbar from "@/components/Navbar/Navbar";

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
    <div className={scss.start}>
      <Navbar />
      <div className="container">
        <section className={scss.headerNav}>
          <div className="container">
            <p>Основные настройки</p>
            <nav className={scss.nav}>
              <Link href="/service/servicepage/advancedsettings">
                <p> Расширенные настройки</p>
              </Link>
              <br />
              <Link href="/service/servicepage/basicsettings">
                <p className={scss.headerLine}> Основные настройки</p>
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
                <div className={scss.form_inputs}>
                  <h1>Name</h1>
                  <input
                    id="haircut"
                    {...register("haircut", { required: true })}
                    placeholder="e.g. Haircut"
                  />
                </div>

                <div className={scss.form_inputs_sector1}>
                  <h1>Category</h1>
                  <select
                    id="category"
                    {...register("defaultOption", { required: true })}
                    defaultValue="By default"
                  >
                    <option value="By default">By default</option>
                  </select>
                </div>

                <div className={scss.box}>
                  <h1>Базовая цена</h1>
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
                    <div className={scss.checkbox}>
                      <input
                        type="checkbox"
                        onClick={() => setShowRangeInput(!showRangeInput)}
                      />
                      <p>Укажите базовый ценовой диапазон</p>
                    </div>
                  </div>
                </div>

                <div className={scss.form_inputs_sector3}>
                  <h1>Продолжительность</h1>
                  <select
                    className={scss.select2}
                    id="hour"
                    {...register("hour", { required: true })}
                    defaultValue="1h"
                  >
                    <option value="1h">1h</option>
                    <option value="2h">2h</option>
                  </select>

                  <select
                    id="minute"
                    {...register("minute", { required: true })}
                  >
                    <option value="1m">1 minute</option>
                    <option value="2m">2 minutes</option>
                  </select>
                </div>

                <input type="hidden" {...register("number")} value={count} />
                <div className={scss.form_buttons}>
                  <h1>Booking type</h1>
                  <div className={scss.block}>
                    <input
                      type="radio"
                      onClick={() =>
                        setShowMembershipDebit(!showMembershipDebit)
                      }
                    />
                    <div className={scss.boxsecrey}>
                      {showMembershipDebit && (
                        <div className={scss.form_counts}>
                          <div className={scss.count}>
                            <button
                              type="button"
                              onClick={() =>
                                setCount((c) => (c > 0 ? c - 1 : 0))
                              }
                            >
                              -
                            </button>

                            <h1>{count}</h1>

                            <button
                              type="button"
                              onClick={() => setCount((c) => c + 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className={scss.line}></div>
                <div className={scss.save}>
                  <button className={scss.create} type="submit">
                    create
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BasicSettings;
