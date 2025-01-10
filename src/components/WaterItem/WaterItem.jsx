import s from "./WaterItem.module.css";


const WaterItem = ({ volume, time }) => {
  return (
    <div className={s.item}>
      <p>{volume}ml</p>
      <p>{time}</p>
    </div>
  );
};
export default WaterItem;
