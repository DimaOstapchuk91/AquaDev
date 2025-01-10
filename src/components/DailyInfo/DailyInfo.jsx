import { useState } from "react";
import ChooseDate from "../ChooseDate/ChooseDate.jsx";
import AddWaterBtn from "../AddWaterBtn/AddWaterBtn.jsx";
import WaterModal from "../Modal/WaterModal/WaterModal.jsx";
import WaterList from "../WaterList/WaterList.jsx";

const DailyInfo = () => {
  const waterData = [
    { volume: 250, time: '08:00' },
    { volume: 200, time: '10:30' },
    { volume: 300, time: '12:45' },
    { volume: 150, time: '14:00' },
    { volume: 400, time: '16:20' },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };
  return (
    <div>
      <h2>споживана вода:</h2>
      <WaterList waterData={waterData}/>
      <AddWaterBtn onClick={openModal}/>
      <WaterModal isOpen={isModalOpen} onClose={closeModal}/>
      <h3>обрана дата: {selectedDate}</h3>
      <ChooseDate selectedDate={selectedDate} onDateChange={handleDateChange} />
    </div>
  );
};

export default DailyInfo;
