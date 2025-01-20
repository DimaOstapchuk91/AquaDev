import { useDispatch } from "react-redux";
import { getFormattedDate } from "../../utils/formatDate";
import CalendarItem from "../CalendarItem/CalendarItem";
import s from "./Calendar.module.css";
import { getWaterDay } from "../../redux/water/operations";

const Calendar = ({
  currentDate,
  selectedDate,
  setSelectedDate,
  monthInfo,
  dailyNorma,
}) => {
  const dispatch = useDispatch();

  const handleDayClick = (day) => {
    const date = new Date(currentDate);
    date.setDate(day);

    const formattedDate = getFormattedDate(date);

    dispatch(getWaterDay(formattedDate));

    setSelectedDate(date);
  };

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const today = new Date();

  const days = Array.from({ length: daysInMonth }, (_, index) => {
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

    const isFutureDate =
      new Date(currentDate.getFullYear(), currentDate.getMonth(), dayNumber) >
      today;

    return {
      day: dayNumber,
      totalWater: dayData.totalWater,
      percentage,
      isFutureDate,
    };
  });

  return (
    <ul className={s.calendar}>
      {days.map(({ day, percentage, isFutureDate }) => {
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
            isDisabled={isFutureDate}
            onClick={() => handleDayClick(day)}
          />
        );
      })}
    </ul>
  );
};

export default Calendar;
