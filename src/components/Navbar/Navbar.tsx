import React from "react";
import NavBarHead from "./NavbarHead/NavBarHead";
import s from './Navbar.module.scss'
import CalendarSwiper from "./NavbarCalendar/CalendarSwiper";
import NavbarNavigation from "./NavbarNavigation/NavbarNavigation";
import NavbarSettings from "./NavbarSettings/NavbarSettings";

const Navbar = () => {
  return (
  <div className={s.navbar}>
    <NavBarHead/>
    <CalendarSwiper/>
    <NavbarNavigation/>
    <NavbarSettings/>
  </div>
  );
};

export default Navbar;
