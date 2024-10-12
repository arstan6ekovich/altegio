import React, { useEffect, useState } from "react";
import s from "./NavbarHead.module.scss";
import { TfiVimeoAlt } from "react-icons/tfi";
import { IoMdNotificationsOutline } from "react-icons/io";
import axios from "axios";
import { useSearchParams } from "next/navigation";

interface UserType {
  createdAt: string;
  email: string;
  id: string;
  isActive: string;
  photo: string;
  role: string;
  updatedAt: string;
  username: string;
}

const NavBarHead = () => {
  const user = JSON.parse(String(localStorage.getItem("user")));
  const [users, setUsers] = useState<string>();
  console.log(users);

  const handleUser = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/auth/user`,
        {
          headers: {
            Authorization: `Bearer ${user}`,
          },
        }
      );
      setUsers(data.profile.username);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handleUser();
  }, [user]);

  return (
    <div className={s.navbarHead}>
      <div className={s.navbarHeadTitle}>
        <div className={s.navbarHeadTitleIcon}>
          <TfiVimeoAlt />
        </div>
        <h3>{users}</h3>
      </div>
      <IoMdNotificationsOutline />
    </div>
  );
};

export default NavBarHead;
