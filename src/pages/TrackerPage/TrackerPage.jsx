import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo.jsx";
import WaterDetailedInfo from "../../components/WaterDetailedInfo/WaterDetailedInfo.jsx";
import s from "./TrackerPage.module.css";

const TrackerPage = () => {
  return (
    <div className={s.wrapper}>
      <WaterMainInfo />
      <WaterDetailedInfo />
    </div>
  );
};
export default TrackerPage;
