import { useDispatch, useSelector } from "react-redux";
import { deleteWaterPortion } from "../../../redux/water/operations";
import s from "./DeleteWaterModal.module.css";
import Loader from "../../Loader/Loader.jsx";
import { selectLoading } from "../../../redux/water/selectors.js";

const DeleteWaterModal = ({ onClose, id }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);

  const handleDelete = async () => {
    await dispatch(deleteWaterPortion(id));
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
          <button
            type="button"
            className={s.btnDelete}
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className={s.loaderContainer}>
                <Loader />
              </div>
            ) : (
              "Delete"
            )}
          </button>
          <button type="button" className={s.btnCancel} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteWaterModal;
