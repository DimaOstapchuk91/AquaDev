import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo.jsx";
import WaterDetailedInfo from "../../components/WaterDetailedInfo/WaterDetailedInfo.jsx";
import { getUserData } from "../../redux/user/operations.js";
import { getWaterDay } from "../../redux/water/operations.js";

const TrackerPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadData = async () => {
      await dispatch(getUserData());
      await dispatch(getWaterDay());
    };

    loadData();
  }, [dispatch]);

  return (
    <div className={"container"}>
      <WaterMainInfo />
      <WaterDetailedInfo />
    </div>
  );
};
export default TrackerPage;
