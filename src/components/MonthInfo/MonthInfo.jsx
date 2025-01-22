import { useState, useEffect } from "react";
import Calendar from "../Calendar/Calendar";
import CalendarPagination from "../CalendarPagination/CalendarPagination";
import s from "./MonthInfo.module.css";
import sprite from "../../assets/sprite.svg";

import { useDispatch, useSelector } from "react-redux";
import { getWaterMonth } from "../../redux/water/operations";
import {
  selectTotalWater,
  selectWaterMonth,
} from "../../redux/water/selectors";
import { selectUser } from "../../redux/user/selectors";
import { getformatDateYearMonth } from "../../utils/formatDate";
import Chart from "../Chart/Chart";

const getCurrentWeek = (currentDate) => {
  const startOfWeek = new Date(currentDate);
  const dayIndex = startOfWeek.getDay();
  const distance = dayIndex === 0 ? -6 : 1 - dayIndex;
  startOfWeek.setDate(currentDate.getDate() + distance);

  return Array.from({ length: 7 }, (_, i) => {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    return day;
  });
};

const MonthInfo = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [isCalendarActive, setCalendarActive] = useState(true);
  const [weekData, setWeekData] = useState([]);
  const [isPaginationDisabled, setPaginationDisabled] = useState(false);
  const getTotalWater = useSelector(selectTotalWater);

  const dispatch = useDispatch();
  const monthInfo = useSelector(selectWaterMonth);
  const { dailyNorma } = useSelector(selectUser);

  useEffect(() => {
    const formattedDate = getformatDateYearMonth(currentDate);

    dispatch(getWaterMonth(formattedDate));
  }, [currentDate, dispatch, getTotalWater]);

  useEffect(() => {
    if (!monthInfo || monthInfo.length === 0) return;

    const weekDays = getCurrentWeek(new Date());

    const data = weekDays.map((day) => {
      const formattedDate = day.toISOString().split("T")[0];

      const dayData = monthInfo.find((info) => info.date === formattedDate);

      return {
        name: day.getDate().toString(),
        water: dayData ? dayData.totalWater : 0,
      };
    });

    setWeekData(data);
  }, [monthInfo, currentDate]);

  const handleClick = () => {
    setCalendarActive(!isCalendarActive);
    setPaginationDisabled(!isPaginationDisabled);
  };

  return (
    <div className={s.monthInfo}>
      <div className={s.monthInfoHeader}>
        <h2 className={s.monthTitle}>{`${
          isCalendarActive ? "Month" : "Statistics"
        }`}</h2>
        <div className={s.container}>
          <CalendarPagination
            currentDate={currentDate}
            isPaginationDisabled={isPaginationDisabled}
            setCurrentDate={setCurrentDate}
          />
          <button className={s.button} onClick={handleClick}>
            <svg className={s.icon}>
              <use href={`${sprite}#icon-pie-chart-02`}></use>
            </svg>
          </button>
        </div>
      </div>
      {isCalendarActive ? (
        <Calendar
          monthInfo={monthInfo}
          currentDate={currentDate}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          dailyNorma={dailyNorma}
        />
      ) : (
        <Chart weekData={weekData} />
      )}
    </div>
  );
};

export default MonthInfo;
