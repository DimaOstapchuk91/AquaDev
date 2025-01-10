import { useState } from "react";
import AddWaterBtn from "../AddWaterBtn/AddWaterBtn.jsx";
import Logo from "../Logo/Logo.jsx";
import WaterDailyNorma from "../WaterDailyNorma/WaterDailyNorma.jsx";
import WaterProgressBar from "../WaterProgressBar/WaterProgressBar.jsx";
import s from "./WaterMainInfo.module.css";
import Modal from "../Modal/Modal.jsx";
import WaterModal from "../Modal/WaterModal/WaterModal.jsx";

const WaterMainInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddWaterBtnClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={s.wrapper}>
      <Logo />
      <WaterDailyNorma />
      <WaterProgressBar />
      <div className={s.btnContainer}>
        <AddWaterBtn
          customClassName={"mainInfoButton"}
          onClick={handleAddWaterBtnClick}
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

export default WaterMainInfo;
