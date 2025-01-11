import { useState } from "react";
import Calendar from "../Calendar/Calendar";
import CalendarPagination from "../CalendarPagination/CalendarPagination";
import s from "./MonthInfo.module.css";
import sprite from "../../assets/sprite.svg";

const MonthInfo = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [isCalendarActive, setSsCalendarActive] = useState(true);

  const handleClick = () => {
    setSsCalendarActive(!isCalendarActive);
  };

  return (
    <div className={s.monthInfo}>
      <div className={s.monthInfoHeader}>
        <h2 className={s.monthTitle}>Month</h2>
        <div className={s.container}>
          <CalendarPagination
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
          />
          <button className={s.button} onClick={handleClick}>
            <svg className={s.icon}>
              <use href={`${sprite}#icon-pie-chart-02`}></use>
            </svg>
          </button>
        </div>
      </div>
      {isCalendarActive && (
        <Calendar
          currentDate={currentDate}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      )}
    </div>
  );
};

export default MonthInfo;
