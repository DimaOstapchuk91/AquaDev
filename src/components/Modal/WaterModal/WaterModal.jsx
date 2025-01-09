import React from "react";
import PropTypes from "prop-types";
import Modal from "../Modal";
import WaterForm from "../WaterForm/WaterForm.jsx";

const WaterModal = ({ isOpen, onClose, type, initialData }) => {
  const title =
    type === "add" ? "Add water" : "Edit the entered amount of water";

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="water-modal">
        <h2>{title}</h2>
        <p>{type === "add" ? "Choose a value:" : "Correct entered data:"}</p>
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
