import Link from "next/link";
import React from "react";

const ServicePage = () => {
  return (
    <div>
      Категории услуг
      <br />
      <Link href="/service/servicepage/advancedsettings">добавить услуги</Link>
    </div>
  );
};

export default ServicePage;
