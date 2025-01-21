import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import s from "./CalendarPagination.module.css";
import { formatDateDatMonth } from "../../utils/dateFormatter";

const CalendarPagination = ({
  currentDate,
  setCurrentDate,
  isPaginationDisabled,
}) => {
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
        disabled={isPaginationDisabled}
      >
        <FaChevronLeft />
      </button>
      <p className={s.dataInfo}>
        {isPaginationDisabled
          ? formatDateDatMonth(new Date().toISOString())
          : formatDateDatMonth(currentDate.toISOString())}
      </p>
      <button
        onClick={() => changeMonth(1)}
        className={s.calendarPaginationButton}
        disabled={isPaginationDisabled}
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default CalendarPagination;
