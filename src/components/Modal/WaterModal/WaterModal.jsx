import Modal from "../Modal.jsx";
import WaterForm from "../WaterForm/WaterForm.jsx";
import s from "./WaterModal.module.css";

const WaterModal = ({ isOpen, onClose, toggleHandle, water, type }) => {
  const title =
    type === "add" ? "Add water" : "Edit the entered amount of water";
  const subtitle = type === "add" ? "Choose a value:" : "Correct entered data:";

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
