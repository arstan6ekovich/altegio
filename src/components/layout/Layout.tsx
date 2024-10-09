import { FC, ReactNode } from "react";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import scss from "./Layout.module.scss";
import HomePage from "../pages/HomePage/HomePage";

const Layout = () => {
  return (
    <div id={scss.Layout}>
      <Header />
      <HomePage />
      <Footer />
    </div>
  );
};

export default Layout;
