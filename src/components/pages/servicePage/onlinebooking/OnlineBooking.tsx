"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

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
    <>
      <div>
        Онлайн-запись
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

      <section>
        <div className="container">
          <div className="">
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                {...register("name", { required: true })}
                placeholder="Имя"
              />
              <textarea
                {...register("description", { required: true })}
                placeholder="Описание"
              ></textarea>
              <input type="file" {...register("url", { required: true })} />

              <button onClick={() => setIsOpen(!isOpen)}>Open</button>
              {!isOpen ? (
                <h1>Online prepayment</h1>
              ) : (
                <>
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
                </>
              )}

              <button onClick={() => setIsTrue(!isTrue)}>True-False</button>
              {!isTrue ? (
                <h1>Online prepayment</h1>
              ) : (
                <>
                  <input
                    type="date"
                    {...register("data", { required: true })}
                  />
                  <input
                    type="time"
                    {...register("time", { required: true })}
                  />
                </>
              )}
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default OnlineBooking;
