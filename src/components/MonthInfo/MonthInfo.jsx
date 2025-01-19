import { useState, useEffect } from "react";
import Calendar from "../Calendar/Calendar";
import CalendarPagination from "../CalendarPagination/CalendarPagination";
import s from "./MonthInfo.module.css";
import sprite from "../../assets/sprite.svg";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { getWaterMonth } from "../../redux/water/operations";
import { selectWaterMonth } from "../../redux/water/selectors";
import { selectUser } from "../../redux/user/selectors";
import { getformatDateYearMonth } from "../../utils/formatDateYearMonth";

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

  const dispatch = useDispatch();
  const monthInfo = useSelector(selectWaterMonth);
  const { dailyNorma } = useSelector(selectUser);

  // useEffect(() => {
  //   const weekDays = getCurrentWeek(currentDate);
  //   console.log(dailyNorma, "dailyNorma");

  //   // misachni dani
  //   const date = currentDate;

  //   const year = date.getFullYear();
  //   const month = String(date.getMonth() + 1).padStart(2, "0");

  //   dispatch(getWaterMonth({ year, month }));

  //   if (!monthInfo || monthInfo.length === 0) {
  //     console.log("no data");
  //     console.log(monthInfo, "inside if");

  //     return;
  //   }
  //   console.log("have data");

  //   console.log(monthInfo, "outside if");

  //   // dani для граафіуу
  //   const data = weekDays.map((day) => {
  //     const formattedDate = day.toISOString().split("T")[0]; // data rik-misyac-den
  //     const dayData = monthInfo.find((info) => info.date === formattedDate);
  //     return {
  //       name: day.getDate().toString(), // день
  //       water: dayData ? dayData.totalWater : 0, // або дані або 0
  //     };
  //   });
  //   console.log(data, "data");

  //   setWeekData(data);
  // }, [currentDate, dailyNorma, dispatch, monthInfo]);

  // Запит даних місяця лише при зміні дати
  useEffect(() => {
    const formattedDate = getformatDateYearMonth(currentDate);
    console.log(formattedDate, "formattedDate");

    dispatch(getWaterMonth(formattedDate));
  }, [currentDate, dispatch]);

  useEffect(() => {
    console.log(monthInfo, "monthInfo");

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
    console.log(data, "data");

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
        <div style={{ width: "100%", height: "300px", maxWidth: "600px" }}>
          <ResponsiveContainer>
            <AreaChart
              width={303}
              height={213}
              data={weekData}
              margin={{ top: 10, right: 30, bottom: 20, left: 20 }}
            >
              <defs>
                <linearGradient
                  id="gradient"
                  x1="98.3597"
                  y1="213"
                  x2="105.349"
                  y2="10.1215"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#9BE1A0" stopOpacity="0.1" />
                  <stop offset="1" stopColor="#9BE1A0" />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="water"
                stroke="#9BE1A0"
                strokeWidth={2}
                fill="url(#gradient)"
                dot={{ r: 7, strokeWidth: 2, fill: "#FFF", stroke: "#9BE1A0" }}
                activeDot={{ r: 8, stroke: "#EFEFEF", fill: "fff" }}
              />
              <XAxis
                dataKey="name"
                tick={{
                  fontSize: 15,
                  fontWeight: "normal",
                  fill: "#323F47",
                  dy: 21,
                }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                domain={[0, 3000]}
                tickFormatter={(value) => `${(value / 1000).toFixed(1)}L`}
                tick={{
                  fontSize: 15,
                  fontWeight: "normal",
                  fill: "#323F47",
                  dx: -20,
                }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                formatter={(value) => [`${value} ml`]}
                contentStyle={{
                  backgroundColor: "#FFF",
                  border: "1px solid #EFEFEF",
                  borderRadius: "8px",
                  fontSize: "14px",
                  color: "#000",
                }}
                itemStyle={{
                  color: "#000",
                }}
                labelFormatter={() => ""}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default MonthInfo;
