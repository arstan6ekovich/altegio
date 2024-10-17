import Link from "next/link";
import React from "react";
import scss from "./InformationPage.module.scss";

const InformationPage = () => {
  return (
    <>
      <section>
        <div className="container">
          <div className="header">
            InformationPage
            <div className={scss.nav}>
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
          </div>
        </div>
      </section>
    </>
  );
};

export default InformationPage;
