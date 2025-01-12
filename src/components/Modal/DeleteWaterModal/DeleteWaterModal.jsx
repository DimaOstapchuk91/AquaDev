import s from "./DeleteWaterModal.module.css";
import Modal from "../Modal.jsx";
import { useDispatch } from "react-redux";
// import { deleteWater } from "../../redux/water/operations";

const DeleteWaterModal = ({ isOpen, onClose, id }) => {
  const dispatch = useDispatch();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={s.modal}>
        <div className={s.modalWrapper}>
          <div className={s.modalContent}>
            <h2 className={s.titleDelete}>Delete entry</h2>
            <p className={s.textDelete}>
              Are you sure you want to delete the entry?
            </p>
            <div className={s.boxForBtn}>
              <button
                type="button"
                className={s.btnDelete}
                onClick={() => dispatch(deleteWater(id))}
              >
                Delete
              </button>
              <button type="button" className={s.btnCancel} onClick={onClose}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteWaterModal;
