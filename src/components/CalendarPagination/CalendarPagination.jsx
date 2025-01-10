import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import s from "./CalendarPagination.module.css";
const CalendarPagination = ({ currentDate, setCurrentDate }) => {
  const months = [
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

  const currentMonth = months[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();

  const changeMonth = (direction) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + direction);
      return newDate;
    });
  };

  return (
    <div className={s.calendarPagination}>
      <button
        onClick={() => changeMonth(-1)}
        className={s.calendarPaginationButton}
      >
        <FaChevronLeft />
      </button>
      <p className={s.dataInfo}>{`${currentMonth}, ${currentYear}`}</p>
      <button
        onClick={() => changeMonth(1)}
        className={s.calendarPaginationButton}
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default CalendarPagination;
