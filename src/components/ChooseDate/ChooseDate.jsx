import { useSelector } from "react-redux";
import { selectDateDay } from "../../redux/water/selectors.js";
import { getFormattedDate } from "../../utils/formatDate.js";
import s from "./ChooseDate.module.css";
import { useTranslation } from "react-i18next";

const ChooseDate = () => {
  const { t } = useTranslation();

  const getDate = useSelector(selectDateDay);

  // const months = [
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  //   "August",
  //   "September",
  //   "October",
  //   "November",
  //   "December",
  // ];
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
  ];

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = months[date.getMonth()];
    return `${day}, ${month}`;
  };

  const comparison = getFormattedDate(new Date());

  // const chosenDay = comparison === getDate ? "Today" : formatDate(getDate);
  const chosenDay =
    comparison === getDate ? t("chooseDate") : formatDate(getDate);

  return (
    <div>
      <p className={s.todayText}>{chosenDay}</p>
    </div>
  );
};
export default ChooseDate;
