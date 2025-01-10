import WaterItem from "../WaterItem/WaterItem.jsx";
import s from "./WaterList.module.css";

const WaterList = ({ waterData }) => {
  return (
    <ul className={s.container}>
      {waterData.map((item, index) => (
        <li key={index}>
          <WaterItem volume={item.volume} time={item.time} />
        </li>
      ))}
    </ul>
  );
};
export default WaterList;
