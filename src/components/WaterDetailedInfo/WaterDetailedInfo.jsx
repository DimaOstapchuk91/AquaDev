import UserPanel from "../UserPanel/UserPanel.jsx";
import DailyInfo from "../DailyInfo/DailyInfo.jsx";
import MonthInfo from "../MonthInfo/MonthInfo.jsx";

const WaterDetailedInfo = () => {
  return (
    <div>
      <h2>Detailed Water Information</h2>
      <UserPanel />
      <DailyInfo />
      <MonthInfo />
    </div>
  );
};

export default WaterDetailedInfo;
