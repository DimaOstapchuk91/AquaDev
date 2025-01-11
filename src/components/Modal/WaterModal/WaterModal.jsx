import PropTypes from "prop-types";
import Modal from "../Modal/Modal.jsx";
import WaterForm from "../WaterForm/WaterForm.jsx";
import styles from './WaterModal.module.css'
const WaterModal = ({ isOpen, onClose, type, initialData }) => {
  const title =
    type === "add" ? "Add water" : "Edit the entered amount of water";

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.waterModal}>
        <h2 className={styles.waterTitle}>{title}</h2>
        <p className={styles.waterText}>{type === "add" ? "Choose a value:" : "Correct entered data:"}</p>
        <WaterForm type={type} initialData={initialData} onClose={onClose} />
      </div>
    </Modal>
  );
};

WaterModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["add", "edit"]).isRequired,
  initialData: PropTypes.shape({
    amount: PropTypes.number,
    time: PropTypes.string,
  }),
};

export default WaterModal;
