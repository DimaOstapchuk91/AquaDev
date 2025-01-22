import WaterForm from "../WaterForm/WaterForm.jsx";
import s from "./WaterModal.module.css";

import { useTranslation } from "react-i18next";

const WaterModal = ({ onClose, toggleHandle, portionData, id, type }) => {
  const { t } = useTranslation();

  const title =
    type === "add" ? t("waterModal.addWater") : t("waterModal.editValue");
  const subtitle =
    type === "add" ? t("waterModal.chooseValue") : t("waterModal.correctData");

  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>{title}</h2>
      <WaterForm
        subtitle={subtitle}
        onClose={onClose}
        toggleHandle={toggleHandle}
        portionData={portionData}
        id={id}
        type={type}
      />
    </div>
  );
};

export default WaterModal;
