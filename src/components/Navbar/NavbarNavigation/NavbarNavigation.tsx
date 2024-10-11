"use client";
import React, { useState } from "react";
import s from "./NavbarNavigation.module.scss";
import { PiUsersThree } from "react-icons/pi";
import { GrOverview } from "react-icons/gr";

import { IoIosArrowDown } from "react-icons/io";

const NavbarNavigation = () => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

  const toggleDropDown = (index: any) => {
    setOpenDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  console.log(openDropdownIndex);

  return (
    <div className={s.navigationsBar}>
      <div className={s.navigations}>
        <div className={s.navigation}>
          <span className={s.navigationIcon}>
            <PiUsersThree />
          </span>
          <div className={s.dropArrow}>
            <h2>Клиенты</h2>
            <IoIosArrowDown
              style={{
                transform:
                  openDropdownIndex == 0 ? "rotate(180deg)" : "rotate(360deg)",
              }}
              onClick={() => toggleDropDown(0)}
            />
          </div>
        </div>
        {openDropdownIndex == 0 && (
          <ul className={s.navDropdown}>
            <li>База данных клиентов</li>
            <li>Категории клиентов</li>
            <li>Программа лояльности</li>
          </ul>
        )}
      </div>
      <div className={s.navigations}>
        <div className={s.navigation}>
          <span className={s.navigationIcon}>
            <GrOverview />
          </span>
          <div className={s.dropArrow}>
            <h2>Обзор</h2>
            <IoIosArrowDown
              style={{
                transform:
                  openDropdownIndex == 1 ? "rotate(180deg)" : "rotate(360deg)",
              }}
              onClick={() => toggleDropDown(1)}
            />
          </div>
        </div>
        {openDropdownIndex === 1 && (
          <ul className={s.navDropdown}>
            <li>Краткое содержание</li>
            <li>Бронирование</li>
            <li>События</li>
            <li>Обзоры</li>
            <li>Сообщение</li>
            <li>Звонки</li>
            <li>Журнал данных</li>
            <li>Журнал изменений</li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default NavbarNavigation;
