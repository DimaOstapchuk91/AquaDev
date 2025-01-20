import s from "./CalendarItem.module.css";
const CalendarItem = ({
  day,
  isToday,
  isSelected,
  onClick,
  percentage,
  isDisabled,
}) => {
  return (
    <li className={s.calendarItemContainer}>
      <button
        className={`${s.calendarItem} ${isToday ? s.currentDay : ""} ${
          isSelected ? s.selected : ""
        } ${percentage === 0 ? s.emptyDay : ""}`}
        onClick={() => onClick(day)}
        disabled={isDisabled}
      >
        {day}
      </button>
      <p className={s.percentage}>{percentage > 0 ? `${percentage}%` : "0%"}</p>
    </li>
  );
};

export default CalendarItem;
