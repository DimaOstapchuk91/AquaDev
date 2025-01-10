import WaterItem from "../WaterItem/WaterItem.jsx";
import s from "./WaterList.module.css";
const WaterList = ({ waterData }) => {
  return (
    <div style={s.container}>
      {waterData.map((item, index) => {
        <WaterItem key={index} volume={item.volume} time={item.time} />;
      })}
    </div>
  );
};
export default WaterList;
