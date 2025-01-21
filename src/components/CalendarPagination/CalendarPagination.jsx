import s from "./CalendarPagination.module.css";
import sprite from "../../assets/sprite.svg";
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
        <svg className={s.iconArrLeft} width="20" height="20">
          <use className={s.left} href={`${sprite}#icon-down`}></use>
        </svg>
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
        <svg className={s.iconArrRight} width="20" height="20">
          <use className={s.right} href={`${sprite}#icon-down`}></use>
        </svg>
      </button>
    </div>
  );
};

export default CalendarPagination;
