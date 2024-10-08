import Link from "next/link";
import React from "react";

const OnlineBooking = () => {
  return (
    <div>
      Онлайн-запись
      <br />
      <Link href="/service/servicepage/advancedsettings">
        расширенные-настройки
      </Link>
      <br />
      <Link href="/service/servicepage/basicsettings">оснавные настройки</Link>
      <br />
      <Link href="/service/servicepage/onlinebooking">Онлайн-запись</Link>
    </div>
  );
};

export default OnlineBooking;
