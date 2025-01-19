import { useSelector } from "react-redux";
import { selectDateDay } from "../../redux/water/selectors.js";
import { getFormattedDate } from "../../utils/formatDate.js";

//============================
import { useTranslation } from "react-i18next";
//===============================

const ChooseDate = () => {
  //===========================
  const { t } = useTranslation();
  //============================
  const getDate = useSelector(selectDateDay);

  const comparison = getFormattedDate(new Date());

  const ChosenDay = comparison === getDate ? t("chooseDate") : getDate;

  return (
    <div>
      <p>{ChosenDay}</p>
    </div>
  );
};
export default ChooseDate;
