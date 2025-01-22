import { useSelector } from "react-redux";
import WaterItem from "../WaterItem/WaterItem.jsx";
import s from "./WaterList.module.css";
import { selectWaterPortions } from "../../redux/water/selectors.js";
import { useTranslation } from "react-i18next";

const WaterList = ({ getDate, currentDay }) => {
  const dailyData = useSelector(selectWaterPortions);

  const { t } = useTranslation();

  return dailyData.length === 0 ? (
    <div className={s.nameText}>
      <div className={s.textItemDiv}>
        {getDate === currentDay ? (
          <p>{t("waterList.letsDrinkWater")}</p>
        ) : (
          <p>{t("waterList.oopsNoWater")}</p>
        )}
      </div>
    </div>
  ) : (
    <ul className={s.container}>
      {dailyData.map((item) => (
        <WaterItem
          key={item._id}
          id={item._id}
          amount={item.amount}
          time={item.time}
        />
      ))}
    </ul>
  );
};
export default WaterList;
