import s from "./WaterItem.module.css";
import sprite from "../../assets/sprite.svg";

const WaterItem = ({ volume, time }) => {
  return (
    <li className={s.item}>
      <svg className={s.iconGlass} width="38" height="38">
        <use href={`${sprite}#icon-mage_water-glass-fill`}></use>
      </svg>
      <div className={s.dataWrapper}>
        <p className={s.textVolume}>{volume}ml</p>
        <p className={s.textTime}>{time}</p>
      </div>
      <div className={s.dataWrapper}>
        <button type="button">
          <svg className={s.iconChange} width="14" height="14">
            <use href={`${sprite}#icon-edit-2`}></use>
          </svg>
        </button>
        <button type="button">
          <svg className={s.iconDell} width="14" height="14">
            <use href={`${sprite}#icon-trash-04`}></use>
          </svg>
        </button>
      </div>
    </li>
  );
};
export default WaterItem;
