import Link from "next/link";
import React from "react";

const BasicSettings = () => {
  return (
    <div>
      оснавные настройки
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

export default BasicSettings;
