"use client";

import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { IoIosArrowForward, IoIosArrowBack  } from "react-icons/io";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SwiperCore from "swiper";
import s from "./CalendarSwiper.module.scss";

const CalendarSwiper = () => {
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth()
  );
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );

  const swiperRef = useRef<SwiperCore | null>(null); 

  const months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getDaysInMonth = (month: number, year: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  const renderCalendarDays = (
    month: number,
    year: number
  ): (number | null)[] => {
    const daysInMonth = getDaysInMonth(month, year);
    const firstDay = new Date(year, month).getDay();
    const daysArray: (number | null)[] = [];

    for (let i = 0; i < firstDay; i++) {
      daysArray.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }

    return daysArray;
  };

  const handlePrevSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  return (
    <div className={s.calendarSwiper}>
      <div className={s.calendarTitle}>
        <button className={s.calendarTitleBtn} onClick={handlePrevSlide}><IoIosArrowBack /></button>
        <h1 className={s.title}>
          {months[currentMonth]} {currentYear}
        </h1>
        <button className={s.calendarTitleBtn} onClick={handleNextSlide}><IoIosArrowForward />
        </button>
      </div>

      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        onSwiper={(swiper) => {
          swiperRef.current = swiper; 
        }}
        onSlideChange={(swiper) => {
          const newMonth = swiper.realIndex % 12;
          const newYear = currentYear + Math.floor(swiper.realIndex / 12);
          setCurrentMonth(newMonth);
          setCurrentYear(newYear);
        }}
        initialSlide={
          currentMonth + (currentYear - new Date().getFullYear()) * 12
        }
      >
        {months.map((month, index) => (
          <SwiperSlide key={index}>
            <div className={s.monthView}>
              <div className={s.calendarGrid}>
                <div className={s.dayHeader}>su</div>
                <div className={s.dayHeader}>mo</div>
                <div className={s.dayHeader}>tu</div>
                <div className={s.dayHeader}>we</div>
                <div className={s.dayHeader}>th</div>
                <div className={s.dayHeader}>fr</div>
                <div className={s.dayHeader}>sa</div>

                {renderCalendarDays(currentMonth, currentYear).map(
                  (day, index) =>
                    day ? (
                      <div className={s.dayCell} key={index}>
                        {day}
                      </div>
                    ) : (
                      <div className={s.emptyCell} key={index}></div>
                    )
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CalendarSwiper;
