import { useSelector } from "react-redux";
import clsx from "clsx";
import { selectDateDay } from "../../redux/water/selectors.js";
import {
  formatDateDatMonth,
  getFormattedDate,
} from "../../utils/formatDate.js";
import s from "./ChooseDate.module.css";

const ChooseDate = ({ customClassName }) => {
  const getDate = useSelector(selectDateDay);

  const comparison = getFormattedDate(new Date());

  const chosenDay =
    comparison === getDate ? "Today" : formatDateDatMonth(getDate);

  return (
    <div>
      <p className={clsx(s[customClassName])}>{chosenDay}</p>
    </div>
  );
};
export default ChooseDate;
