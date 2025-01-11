import CalendarItem from "../CalendarItem/CalendarItem";
import s from "./Calendar.module.css";

const Calendar = ({ currentDate, selectedDate, setSelectedDate }) => {
  const handleDayClick = (day) => {
    const date = new Date(currentDate);

    date.setDate(day);
    console.log(date);

    setSelectedDate(date);
  };

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const days = Array.from({ length: daysInMonth }, (_, index) => index + 1);

  const today = new Date();

  return (
    <ul className={s.calendar}>
      {days.map((day) => {
        const isCurrentDay =
          today.getDate() === day &&
          today.getMonth() === currentDate.getMonth();

        return (
          <CalendarItem
            key={day}
            day={day}
            isToday={isCurrentDay}
            percentage={100}
            isSelected={
              selectedDate &&
              selectedDate.getDate() === day &&
              selectedDate.getMonth() === currentDate.getMonth()
            }
            onClick={handleDayClick}
          />
        );
      })}
    </ul>
  );
};

export default Calendar;
