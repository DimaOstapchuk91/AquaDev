import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteWaterPortion } from "../../../redux/water/operations";
import s from "./DeleteWaterModal.module.css";
import Loader from "../../Loader/Loader.jsx";

const DeleteWaterModal = ({ onClose, id }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    await dispatch(deleteWaterPortion(id));
    setIsLoading(false);
    onClose();
  };

  return (
    <div className={s.modalWrapp}>
      <div className={s.modalContent}>
        <h2 className={s.titleDelete}>Delete entry</h2>
        <p className={s.textDelete}>
          Are you sure you want to delete the entry?
        </p>
        <div className={s.wrappBtn}>
          {!isLoading ? (
            <button
              type="button"
              className={s.btnDelete}
              onClick={handleDelete}
              disabled={isLoading}
            >
              Delete
            </button>
          ) : (
            <div className={s.loaderContainer}>
              <Loader />
            </div>
          )}
          <button type="button" className={s.btnCancel} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteWaterModal;
