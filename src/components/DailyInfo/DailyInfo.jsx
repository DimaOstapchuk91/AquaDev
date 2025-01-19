import { useEffect, useState } from "react";
import ChooseDate from "../ChooseDate/ChooseDate.jsx";
import AddWaterBtn from "../AddWaterBtn/AddWaterBtn.jsx";
import Modal from "../Modal/Modal.jsx";
import WaterModal from "../Modal/WaterModal/WaterModal.jsx";
import WaterList from "../WaterList/WaterList.jsx";
import s from "./DailyInfo.module.css";
import { useSelector } from "react-redux";
import { selectDateDay } from "../../redux/water/selectors.js";
import { getFormattedDate } from "../../utils/formatDate.js";

const DailyInfo = () => {
  const [isToday, setIsToday] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getDate = useSelector(selectDateDay);
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
      <div className={s.dailyWrapper}>
        <div className={s.chooseWrapper}>
          <ChooseDate />
          {isToday &&
            <AddWaterBtn
              customClassName={"dailyInfo"}
              onClick={handleAddWaterBtnClick}
            />
          }
        </div>
        <WaterList />
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

export default DailyInfo;
