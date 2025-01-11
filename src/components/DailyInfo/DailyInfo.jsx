import { useState } from "react";
import ChooseDate from "../ChooseDate/ChooseDate.jsx";
import AddWaterBtn from "../AddWaterBtn/AddWaterBtn.jsx";
import Modal from "../Modal/Modal.jsx";
import WaterModal from "../Modal/WaterModal/WaterModal.jsx";
import WaterList from "../WaterList/WaterList.jsx";
import s from "./DailyInfo.module.css";
const DailyInfo = () => {
  const waterData = [
    { volume: 250, time: "08:00" },
    { volume: 200, time: "10:30" },
    { volume: 300, time: "12:45" },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddWaterBtnClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };
  return (
    <div className={s.wrapper}>
      <div className={s.dailyWrapper}>
        <div className={s.chooseWrapper}>
          <ChooseDate
            selectedDate={selectedDate}
            onDateChange={handleDateChange}
          />
          <AddWaterBtn onClick={handleAddWaterBtnClick} />
        </div>
        <WaterList waterData={waterData} />
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
