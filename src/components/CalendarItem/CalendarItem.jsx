import s from "./CalendarItem.module.css";

const CalendarItem = ({ day, isToday, isSelected, onClick }) => {
  return (
    <div>
      <button
        className={`${s.calendarItem} ${isToday ? s.currentDay : ""} ${
          isSelected ? s.selected : ""
        }`}
        onClick={() => onClick(day)}
      >
        {day}
      </button>
      <p className={s.percentage}>0%</p>
    </div>
  );
};

export default CalendarItem;
