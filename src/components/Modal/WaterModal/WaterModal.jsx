import WaterForm from "../WaterForm/WaterForm.jsx";
import s from "./WaterModal.module.css";

const WaterModal = ({ onClose, toggleHandle, water, type }) => {
  const title =
    type === "add" ? "Add water" : "Edit the entered amount of water";
  const subtitle = type === "add" ? "Choose a value:" : "Correct entered data:";

  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>{title}</h2>
      <WaterForm
        subtitle={subtitle}
        onClose={onClose}
        toggleHandle={toggleHandle}
        water={water}
      />
    </div>
  );
};

export default WaterModal;
