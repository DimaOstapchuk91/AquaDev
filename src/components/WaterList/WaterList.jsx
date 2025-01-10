import WaterItem from "../WaterItem/WaterItem.jsx";
import s from "./WaterList.module.css";
const WaterList = ({ waterData }) => {
  return (
    <div style={s.container}>
      {waterData.map((item) => {
        <WaterItem key={item.id} volume={item.volume} time={item.time} />;
      })}
    </div>
  );
};
export default WaterList;
