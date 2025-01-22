import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddWaterBtn from "../AddWaterBtn/AddWaterBtn.jsx";
import Logo from "../Logo/Logo.jsx";
import WaterDailyNorma from "../WaterDailyNorma/WaterDailyNorma.jsx";
import WaterProgressBar from "../WaterProgressBar/WaterProgressBar.jsx";
import s from "./WaterMainInfo.module.css";
import Modal from "../Modal/Modal.jsx";
import WaterModal from "../Modal/WaterModal/WaterModal.jsx";
import {
  selectDateDay,
  selectTotalWater,
} from "../../redux/water/selectors.js";
import { selectUser } from "../../redux/user/selectors.js";
import LanguageDropdown from "../LocalizationDropdown/LocalizationDropdown.jsx";
import { getFormattedDate } from "../../utils/formatDate.js";

const WaterMainInfo = () => {
  const getDate = useSelector(selectDateDay);
  const totalWater = useSelector(selectTotalWater);
  const totalWaterInL = totalWater / 1000;
  const user = useSelector(selectUser);
  const dailyNormaInL = user.dailyNorma / 1000;
  const waterConsumptionPercent = Math.round(
    (totalWater / user.dailyNorma) * 100
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isToday, setIsToday] = useState(false);

  const currentDay = getFormattedDate(new Date());
  useEffect(() => {
    if (getDate === currentDay) {
      setIsToday(true);
    } else {
      setIsToday(false);
    }
  }, [getDate, currentDay]);

  const handleAddWaterBtnClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={s.wrapper}>
      <div className={s.parentTwoVisible}>
        <LanguageDropdown />
      </div>
      <Logo />
      <WaterDailyNorma dailyNorma={dailyNormaInL} />
      <WaterProgressBar
        value={waterConsumptionPercent}
        totalWaterInL={totalWaterInL}
        dailyNormaInL={dailyNormaInL}
      />
      <div className={s.btnContainer}>
        {isToday && (
          <AddWaterBtn
            customClassName={"mainInfoButton"}
            onClick={handleAddWaterBtnClick}
          />
        )}
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <WaterModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          type={"add"}
        />
      </Modal>
    </div>
  );
};

export default WaterMainInfo;
