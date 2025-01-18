import { useTranslation } from "react-i18next";
import s from "./DeleteWaterModal.module.css";
import { useDispatch } from "react-redux";
// import { deleteWater } from "../../redux/water/operations";

const DeleteWaterModal = ({ onClose, id }) => {
  const dispatch = useDispatch();

  //================
  const { t } = useTranslation();
  //=============

  return (
    <div className={s.modalWrapp}>
      <div className={s.modalContent}>
        {/* <h2 className={s.titleDelete}>Delete entry</h2> */}
        <h2 className={s.titleDelete}> {t("deleteWaterModal.delete")}</h2>

        <p className={s.textDelete}>
          {/* Are you sure you want to delete the entry? */}
          {t("deleteWaterModal.confirmation")}
        </p>
        <div className={s.boxForBtn}>
          <button
            type="button"
            className={s.btnDelete}
            // onClick={() => dispatch(deleteWater(id))}
          >
            {/* Delete */}
            {t("deleteWaterModal.deleteBtn")}
          </button>
          <button type="button" className={s.btnCancel} onClick={onClose}>
            {/* Cancel */}
            {t("deleteWaterModal.cancelBtn")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteWaterModal;
