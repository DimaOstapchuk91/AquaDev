import { useTranslation } from "react-i18next";
import Modal from "../Modal.jsx";
import WaterForm from "../WaterForm/WaterForm.jsx";
import s from "./WaterModal.module.css";

const WaterModal = ({ isOpen, onClose, toggleHandle, water, type }) => {
  const { t } = useTranslation();

  const title =
    //   type === "add" ? "Add water" : "Edit the entered amount of water";
    // const subtitle = type === "add" ? "Choose a value:" : "Correct entered data:";

    type === "add" ? t("waterModal.addWater") : t("waterModal.editValue");
  const subtitle =
    type === "add" ? t("waterModal.chooseValue") : t("waterModal.correctData");

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={s.wrapper}>
        <h2 className={s.title}>{title}</h2>
        <WaterForm
          subtitle={subtitle}
          onClose={onClose}
          toggleHandle={toggleHandle}
          water={water}
          type={type}
        />
      </div>
    </Modal>
  );
};

export default WaterModal;
