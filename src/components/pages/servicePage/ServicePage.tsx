"use client";
import Navbar from "@/components/Navbar/Navbar";
import Link from "next/link";
import React, { useState } from "react";
import s from "./ServicePage.module.scss";
import { MdMenu } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineModeEdit } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";

const ServicePage = () => {
  const [showCreateList, setShowCreateLit] = useState(false);
  console.log(showCreateList, "");

  const openCreateList = () => {
    setShowCreateLit((prev) => !prev);
  };
  return (
    <div className={s.servicePage}>
      <Navbar />
      <div className={s.mainServicePage}>
        <div className={s.headServicePage}>
          <div className={s.serviceBurger}>
            <MdMenu />
          </div>
          <div className={s.headServiceTitle}>
            <h1> Категории услуг</h1>
            <h4>Настройки</h4>
          </div>
        </div>
        <div className={s.servicePageCategories}>
          <div className={s.serviceSearch}>
            <div className={s.serviceSearchInput}>
              <input type="text" placeholder="Название услуги" />
              <IoSearchOutline />
            </div>
            <div className={s.createService}>
              <button onClick={openCreateList}>
                Создавать{" "}
                <IoIosArrowDown
                  style={{
                    transform: showCreateList
                      ? "rotate(180deg)"
                      : "rotate(360deg)",
                  }}
                />
              </button>
              {showCreateList ? (
                <ul className={s.createServiceCard}>
                  <li>Создать категорию</li>
                  <li>Создать услугу</li>
                </ul>
              ) : null}
            </div>
          </div>
        </div>
        <ServiceCategories />
      </div>
    </div>
  );
};

export function ServiceCategories() {
  return (
    <div className={s.serviceCategories}>
      <div className={s.serviceCategory}>
        <div className={s.serviceCategoriesOpen}>
          <IoIosArrowDown />
          <div className={s.serviceCategoriesTitle}>
            <h3>Тинатин</h3>
            <h4>Содержить услуги: 1</h4>
          </div>
        </div>
        <div className={s.serviceCategoriesEdit}>
          <MdOutlineModeEdit />
          <MdMenu />
        </div>
      </div>
      <ServiceCategoryLists />
    </div>
  );
}

export function ServiceCategoryLists() {
  return (
    <div className={s.serviceCategoryLists}>
      <div className={s.serviceCategoryListsHead}>
        <h2>Имя</h2>
        <div className={s.serviceCategoryListsHeadSet}>
          <h2>Онлайн-бронирование</h2>
          <h2>Цена</h2>
          <h2>Продолжительность</h2>
          <h2>Спецификация материалов</h2>
          <h2>Персонал</h2>
        </div>
      </div>
      <div className={s.categotyLists}>
        <div className={s.categoryList}>
          <div className={s.categoryListName}>
            <MdMenu />
            <h2>Tina</h2>
          </div>
          <div className={s.categoryListContent}>
            <div className={s.categoryBook}>
              <div className={s.categoryBookCheck}>
                <div className={s.categoryBookCheckBox}></div>
              </div>
              <span>На</span>
            </div>
            <h3>200 сом</h3>
            <h3>1ч 0м</h3>
            <h4>Не Указано</h4>
            <span>
              <FaRegUserCircle />
            </span>
            <span>
              <MdOutlineModeEdit />
            </span>
          </div>
        </div>
      </div>
      <button className={s.addService}>
        <Link href="/service/servicepage/advancedsettings">
          + Добавить услуги
        </Link>
      </button>
    </div>
  );
}

export default ServicePage;
