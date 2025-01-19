import { useSelector } from "react-redux";
import { selectDateDay } from "../../redux/water/selectors.js";
import { getFormattedDate } from "../../utils/formatDate.js";
import s from "./ChooseDate.module.css";

const ChooseDate = () => {
  const getDate = useSelector(selectDateDay);

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
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = months[date.getMonth()];
    return `${day}, ${month}`;
  };

  const comparison = getFormattedDate(new Date());

  const chosenDay = comparison === getDate ? "Today" : formatDate(getDate);

  return (
    <div>
      <p className={s.todayText}>{chosenDay}</p>
    </div>
  );
};
export default ChooseDate;
