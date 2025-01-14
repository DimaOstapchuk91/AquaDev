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

const mockData = [2000, 1000, 900, 500, 3000, 1000, 2500];

const MonthInfo = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [isCalendarActive, setCalendarActive] = useState(true);
  const [weekData, setWeekData] = useState([]);
  const [isPaginationDisabled, setPaginationDisabled] = useState(false);

  useEffect(() => {
    const weekDays = getCurrentWeek(currentDate);
    const data = weekDays.map((day, i) => ({
      name: day.getDate().toString(),
      water: mockData[i],
    }));
    setWeekData(data);
  }, [currentDate]);

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
          currentDate={currentDate}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
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
                tickFormatter={(value) => {
                  if (value === 0) {
                    return `${(value / 1000).toFixed(0)}%`;
                  }
                  return `${(value / 1000).toFixed(1)}L`;
                }}
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
