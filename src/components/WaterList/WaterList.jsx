import { useSelector } from "react-redux";
import WaterItem from "../WaterItem/WaterItem.jsx";
import s from "./WaterList.module.css";
import { selectWaterPortions } from "../../redux/water/selectors.js";
import sprite from '../../assets/sprite.svg'

const WaterList = () => {
  const dailyData = useSelector(selectWaterPortions);

  return dailyData.length === 0 ? (
    <div className={s.nameText}>
      <div className={s.textItemDiv}>
      <svg className={s.iconGlass} width="38" height="38">
              <use href={`${sprite}#icon-mage_water-glass-fill`}></use>
            </svg>
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
