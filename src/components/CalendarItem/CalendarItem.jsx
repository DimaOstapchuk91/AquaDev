import s from "./CalendarItem.module.css";

const CalendarItem = ({ day, isToday, isSelected, onClick, percentage }) => {
  return (
    <li>
      <button
        className={`${s.calendarItem} ${isToday ? s.currentDay : ""} ${
          isSelected ? s.selected : ""
        } , ${percentage !== 100 ? s.notAchievedYet : ""}`}
        onClick={() => onClick(day)}
      >
        {day}
      </button>
      <p className={s.percentage}> {percentage}%</p>
    </li>
  );
};

export default CalendarItem;
