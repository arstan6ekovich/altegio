"use client";
import Link from "next/link";
import React from "react";

const StaffPage = () => {
  return (
    <div>
      <nav className="">
        <Link href="/staff/services/infarmation">
          <p> Основные настройки</p>
        </Link>
      </nav>
    </div>
  );
};

export default StaffPage;
