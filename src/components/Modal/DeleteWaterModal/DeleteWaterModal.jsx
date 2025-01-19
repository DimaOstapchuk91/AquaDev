import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteWaterPortion } from "../../../redux/water/operations";
import s from "./DeleteWaterModal.module.css";
import Loader from "../../Loader/Loader.jsx";
//==================
import { useTranslation } from "react-i18next";
//=====================

const DeleteWaterModal = ({ onClose, id }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    await dispatch(deleteWaterPortion(id));
    setIsLoading(false);
    onClose();
    //================
    const { t } = useTranslation();
    //=============
  };

  return (
    <div className={s.modalWrapp}>
      <div className={s.modalContent}>
        {/* <h2 className={s.titleDelete}>Delete entry</h2> */}
        <h2 className={s.titleDelete}> {t("deleteWaterModal.delete")}</h2>

        <p className={s.textDelete}>
          {/* Are you sure you want to delete the entry? */}
          {t("deleteWaterModal.confirmation")}
        </p>
        <div className={s.wrappBtn}>
          {!isLoading ? (
            <button
              type="button"
              className={s.btnDelete}
              onClick={handleDelete}
              disabled={isLoading}
            >
              {/* Delete */}
              {t("deleteWaterModal.deleteBtn")}
            </button>
          ) : (
            <div className={s.loaderContainer}>
              <Loader />
            </div>
          )}
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
