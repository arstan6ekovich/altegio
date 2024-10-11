import React from "react";
import s from "./NavbarHead.module.scss";
import { TfiVimeoAlt } from "react-icons/tfi";
import { IoMdNotificationsOutline } from "react-icons/io";

const NavBarHead = () => {
  return (
    <div className={s.navbarHead}>
      <div className={s.navbarHeadTitle}>
        <div className={s.navbarHeadTitleIcon}>
          <TfiVimeoAlt />
        </div>
        <h3>Mar4ik</h3>
      </div>
      <IoMdNotificationsOutline />
    </div>
  );
};

export default NavBarHead;
