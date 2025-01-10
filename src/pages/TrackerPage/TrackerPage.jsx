// import { useDispatch } from 'react-redux';
// import { useEffect } from "react";
import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo.jsx';
import WaterDetailedInfo from '../../components/WaterDetailedInfo/WaterDetailedInfo.jsx';
// import { fetchDailyWaterInfo } from "../../redux/water/operations.js";

const TrackerPage = () => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchDailyWaterInfo());
  // }, [dispatch]);

  return (
    <div className={'container'}>
      <WaterMainInfo />
      <WaterDetailedInfo />
    </div>
  );
};
export default TrackerPage;
