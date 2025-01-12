import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo.jsx";
import WaterDetailedInfo from "../../components/WaterDetailedInfo/WaterDetailedInfo.jsx";
import { fetchDailyWaterInfo } from "../../redux/water/operations.js";
import { getUserData } from "../../redux/user/operations.js";
import { selectError, selectLoading } from "../../redux/water/selectors.js";

const TrackerPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const errorMessage = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchDailyWaterInfo());
    dispatch(getUserData());
  }, [dispatch]);

  return (
    <div className={"container"}>
      {isLoading && !errorMessage && <p>page is loading</p>}

      <WaterMainInfo />
      <WaterDetailedInfo />
    </div>
  );
};
export default TrackerPage;
