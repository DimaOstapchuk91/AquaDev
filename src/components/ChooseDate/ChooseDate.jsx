import { useSelector } from "react-redux";
import clsx from "clsx";
import { selectDateDay } from "../../redux/water/selectors.js";
import {
  formatDateDatMonth,
  getFormattedDate,
} from "../../utils/formatDate.js";
import s from "./ChooseDate.module.css";
import { useTranslation } from "react-i18next";

const ChooseDate = ({ customClassName }) => {
  const { t } = useTranslation();

  const getDate = useSelector(selectDateDay);

  const comparison = getFormattedDate(new Date());

  const chosenDay =
    comparison === getDate ? t("chooseDate") : formatDateDatMonth(getDate);

  return (
    <div>
      <p className={clsx(s[customClassName])}>{chosenDay}</p>
    </div>
  );
};
export default ChooseDate;
