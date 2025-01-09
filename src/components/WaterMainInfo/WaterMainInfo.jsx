import AddWaterBtn from "../AddWaterBtn/AddWaterBtn.jsx";
import Logo from "../Logo/Logo.jsx";
import WaterDailyNorma from "../WaterDailyNorma/WaterDailyNorma.jsx";
import WaterProgressBar from "../WaterProgressBar/WaterProgressBar.jsx";
import s from "./WaterMainInfo.module.css";

const WaterMainInfo = () => {
  return (
    <div className={s.wrapper}>
      <Logo />
      <WaterDailyNorma />
      <WaterProgressBar />
      <div className={s.btnContainer}>
        <AddWaterBtn customClassName={"mainInfoButton"} />
      </div>
    </div>
  );
};

export default WaterMainInfo;
