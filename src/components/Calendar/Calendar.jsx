import { useDispatch, useSelector } from "react-redux";
import { getFormattedDate } from "../../utils/formatDate";
import CalendarItem from "../CalendarItem/CalendarItem";
import s from "./Calendar.module.css";
import { getWaterDay } from "../../redux/water/operations";
import { selectTotalWater } from "../../redux/water/selectors";

const Calendar = ({
  currentDate,
  selectedDate,
  setSelectedDate,
  monthInfo,
  dailyNorma,
}) => {
  const dispatch = useDispatch();
  const getTotalWater = useSelector(selectTotalWater);

  const handleDayClick = (day) => {
    const date = new Date(currentDate);
    date.setDate(day);

    const formattedDate = getFormattedDate(date);
    console.log(formattedDate, "formattedDate");

    dispatch(getWaterDay(formattedDate));

    setSelectedDate(date);
  };

  console.log(getTotalWater, "getTotalWater");

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const days = Array.from({ length: daysInMonth }, (_, index) => {
    console.log(monthInfo, "monthInfo");

    const dayNumber = index + 1;
    const formattedDate = getFormattedDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth(), dayNumber)
    );
    const dayData = monthInfo.find((info) => info.date === formattedDate) || {
      date: formattedDate,
      totalWater: 0,
    };
    const percentage = Math.min(
      100,
      Math.round((dayData.totalWater / dailyNorma) * 100)
    );

    // console.log(
    //   {
    //     dailyNorm: dailyNorma,
    //     total: dayData.totalWater,
    //   },
    //   (dayData.totalWater / dailyNorma) * 100,
    //   formattedDate
    // );

    return {
      day: dayNumber,
      totalWater: dayData.totalWater,
      percentage,
    };
  });

  const today = new Date();

  return (
    <ul className={s.calendar}>
      {days.map(({ day, percentage }) => {
        const isCurrentDay =
          today.getDate() === day &&
          today.getMonth() === currentDate.getMonth() &&
          today.getFullYear() === currentDate.getFullYear();

        return (
          <CalendarItem
            key={day}
            day={day}
            isToday={isCurrentDay}
            isSelected={
              selectedDate &&
              selectedDate.getDate() === day &&
              selectedDate.getMonth() === currentDate.getMonth()
            }
            percentage={percentage}
            onClick={() => handleDayClick(day)}
          />
        );
      })}
    </ul>
  );
};

export default Calendar;
