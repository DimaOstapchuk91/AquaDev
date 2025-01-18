import s from "./CalendarItem.module.css";
const CalendarItem = ({ day, isToday, isSelected, onClick, percentage }) => {
  return (
    <li className={s.calendarItemContainer}>
      <button
        className={`${s.calendarItem} ${isToday ? s.currentDay : ""} ${
          isSelected ? s.selected : ""
        } ${percentage === 0 ? s.emptyDay : ""}`}
        onClick={() => onClick(day)}
      >
        {day}
      </button>
      <p className={s.percentage}>{percentage > 0 ? `${percentage}%` : "0%"}</p>
    </li>
  );
};

export default CalendarItem;
