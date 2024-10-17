import Link from "next/link";
import React from "react";

const OnlinePage = () => {
  return (
    <div>
      OnlinePage
      <Link href="/staff/services/additional">
        <p> Расширенные настройки</p>
      </Link>
      <br />
      <Link href="/staff/services/infarmation">
        <p> Основные настройки</p>
      </Link>
      <br />
      <Link href="/staff/services/online">
        <p>Онлайн-запись</p>
      </Link>
    </div>
  );
};

export default OnlinePage;
