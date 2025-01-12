<<<<<<< HEAD
import WaterForm from "../WaterForm/WaterForm.jsx";
import s from "./WaterModal.module.css";

const WaterModal = ({ onClose, toggleHandle, water, type }) => {
=======
import PropTypes from "prop-types";
import Modal from "../Modal/Modal.jsx";
import WaterForm from "../WaterForm/WaterForm.jsx";
import styles from './WaterModal.module.css'
const WaterModal = ({ isOpen, onClose, type, initialData }) => {
>>>>>>> b8246ad15530f40818f2d348eb1f574b8273b469
  const title =
    type === "add" ? "Add water" : "Edit the entered amount of water";
  const subtitle = type === "add" ? "Choose a value:" : "Correct entered data:";

  return (
<<<<<<< HEAD
    <div className={s.wrapper}>
      <h2 className={s.title}>{title}</h2>
      <WaterForm
        subtitle={subtitle}
        onClose={onClose}
        toggleHandle={toggleHandle}
        water={water}
      />
    </div>
=======
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.waterModal}>
        <h2 className={styles.waterTitle}>{title}</h2>
        <p className={styles.waterText}>{type === "add" ? "Choose a value:" : "Correct entered data:"}</p>
        <WaterForm type={type} initialData={initialData} onClose={onClose} />
      </div>
    </Modal>
>>>>>>> b8246ad15530f40818f2d348eb1f574b8273b469
  );
};

export default WaterModal;
