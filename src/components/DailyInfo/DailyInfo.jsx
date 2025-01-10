import { useState } from "react";
import ChooseDate from "../ChooseDate/ChooseDate.jsx";
import AddWaterBtn from "../AddWaterBtn/AddWaterBtn.jsx";
import Modal from "../Modal/Modal.jsx";
import WaterModal from "../Modal/WaterModal/WaterModal.jsx";
import WaterList from "../WaterList/WaterList.jsx";

const DailyInfo = () => {
  const waterData = [
    { volume: 250, time: "08:00" },
    { volume: 200, time: "10:30" },
    { volume: 300, time: "12:45" },
    { volume: 150, time: "14:00" },
    { volume: 400, time: "16:20" },
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
    <div>
      <div>
        <h3>споживана вода:</h3>
        <WaterList waterData={waterData} />
        <AddWaterBtn onClick={handleAddWaterBtnClick} />

        <h3>обрана дата: {selectedDate}</h3>
        <ChooseDate
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
        />
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
