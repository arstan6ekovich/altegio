import React from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { TbWorldCheck } from "react-icons/tb";
import s from "./NavbarSettings.module.scss";

const NavbarSettings = () => {
  return (
    <div className={s.navSettings}>
      <div className={s.navSetting}>
        <span>
          <IoSettingsOutline />
        </span>
        <h3>Настройки</h3>
      </div>
      <div className={s.navSetting}>
        <span>
          <TbWorldCheck />
        </span>
        <h3>Онлайн бронирование</h3>
      </div>
    </div>
  );
};

export default NavbarSettings;
