import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import s from "./CalendarPagination.module.css";
import { useTranslation } from "react-i18next";
const CalendarPagination = ({
  currentDate,
  setCurrentDate,
  isPaginationDisabled,
}) => {
  const { t } = useTranslation();

  const months = [
    t("months.january"),
    t("months.february"),
    t("months.march"),
    t("months.april"),
    t("months.may"),
    t("months.june"),
    t("months.july"),
    t("months.august"),
    t("months.september"),
    t("months.october"),
    t("months.november"),
    t("months.december"),
    // "January",
    // "February",
    // "March",
    // "April",
    // "May",
    // "June",
    // "July",
    // "August",
    // "September",
    // "October",
    // "November",
    // "December",
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
        disabled={isPaginationDisabled}
      >
        <FaChevronLeft />
      </button>
      <p className={s.dataInfo}>{`${
        isPaginationDisabled ? months[new Date().getMonth()] : currentMonth
      }, ${isPaginationDisabled ? new Date().getFullYear() : currentYear}`}</p>
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
