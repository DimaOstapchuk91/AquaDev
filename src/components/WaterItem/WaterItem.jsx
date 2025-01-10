import s from "./WaterItem.module.css";
const WaterItem = ({ volume, time }) => {
  return (
    <div style={s.item}>
      <p>{volume}ml</p>
      <p>{time}</p>
    </div>
  );
};
export default WaterItem;
