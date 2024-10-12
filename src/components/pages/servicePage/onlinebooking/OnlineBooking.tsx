"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import scss from "./OnlineBooking.module.scss";
import Navbar from "@/components/Navbar/Navbar";

interface OnlineBookingType {
  name: string;
  description: string;
  url: string;
  setup: number;
  data: string;
  time: string;
  booking: string;
  defaultOption: string;
}

const online = process.env.NEXT_PUBLIC_ONLINE;

const OnlineBooking = () => {
  const { register, handleSubmit } = useForm<OnlineBookingType>();
  const [isTrue, setIsTrue] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onSubmit: SubmitHandler<OnlineBookingType> = async (data) => {
    const file = data.url[0];
    const formData = new FormData();
    formData.append("file", file);

    const { data: responseFile } = await axios.post(
      "https://api.elchocrud.pro/api/v1/upload/file",
      formData
    );

    const newData = {
      url: responseFile.url,
      name: data.name,
      description: data.description,
      setup: data.setup,
      data: data.data,
      time: data.time,
      booking: data.booking,
    };

    const { data: responsedata } = await axios.post(online!, newData);
    console.log(responsedata);
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
                <p> Расширенные настройки</p>
              </Link>
              <br />
              <Link href="/service/servicepage/basicsettings">
                <p> Основные настройки</p>
              </Link>
              <br />
              <Link href="/service/servicepage/onlinebooking">
                <p className={scss.headerLine}>Онлайн-запись</p>
              </Link>
            </nav>
          </div>
        </section>

        <section>
          <div className="container">
            <div className={scss.Booking}>
              <form className={scss.forma} onSubmit={handleSubmit(onSubmit)}>
                <div className={scss.box}>
                  <div className={scss.form_input}>
                    <h1>Name for online booking</h1>
                    <input
                      type="text"
                      {...register("name", { required: true })}
                      placeholder="Имя"
                    />
                  </div>

                  <div className={scss.form_area}>
                    <h1>Description</h1>
                    <textarea
                      className={scss.form_area}
                      {...register("description", { required: true })}
                      placeholder="Описание"
                    ></textarea>
                  </div>

                  <div className={scss.form_file}>
                    <h1>Image</h1>
                    <input
                      type="file"
                      {...register("url", { required: true })}
                    />
                  </div>

                  <div className={scss.block}>
                    <div className={scss.text}>
                      <h2>Online prepayment</h2>
                      <p>
                        To register for the service, customers make an advance
                        payment
                      </p>
                    </div>
                    <button
                      className={`${scss["toggle-switch"]} ${
                        isOpen ? scss["on"] : ""
                      }`}
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      <span className={scss["toggle-knob"]}></span>
                    </button>
                  </div>
                </div>
                {!isOpen ? (
                  <></>
                ) : (
                  <div className={scss.box_secret}>
                    <h2>
                      Настройка <br /> предоплаты
                    </h2>
                    <input
                      type="number"
                      {...register("setup", { required: true })}
                    />

                    <select
                      {...register("defaultOption", { required: true })}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Выберите вариант
                      </option>
                      <option value="som">Сом</option>
                      <option value="percentage">Процент</option>
                      <option value="usd">Доллары США</option>
                      <option value="euro">Евро</option>
                    </select>
                  </div>
                )}

                <div className={scss.box2}>
                  <div className={scss.text}>
                    <h2>Prohibit online booking without a membership</h2>
                    <p>
                      To register for the service, customers make an advance
                      payment
                    </p>
                  </div>

                  <button
                    className={`${scss["toggle-switch"]} ${
                      isTrue ? scss["on"] : ""
                    }`}
                    onClick={() => setIsTrue(!isTrue)}
                  >
                    <span className={scss["toggle-knob"]}></span>
                  </button>
                </div>
                <div className={scss.box3}>
                  {!isTrue ? (
                    <></>
                  ) : (
                    <>
                      <div className={scss.box_secret}>
                        <h1>
                          На какой период <br /> доступно <br /> бронирование?
                        </h1>
                        <input
                          type="date"
                          {...register("data", { required: true })}
                        />
                      </div>

                      <div className={scss.box_secret}>
                        <h1>
                          В какое время <br /> доступно <br /> бронирование?
                        </h1>
                        <input
                          type="time"
                          {...register("time", { required: true })}
                        />
                      </div>
                    </>
                  )}
                </div>

                <div className={scss.line}></div>

                <div className={scss.save}>
                  <button className={scss.create} type="submit">
                    create
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default OnlineBooking;
