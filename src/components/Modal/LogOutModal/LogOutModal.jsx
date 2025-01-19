import { useState } from "react";
import { logout } from "../../../redux/user/operations";
import s from "./LogOutModal.module.css";
import { useDispatch } from "react-redux";
import Loader from "../../Loader/Loader.jsx";
//=============
import { useTranslation } from "react-i18next";
//==============

const LogOutModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  //===========
  const { t } = useTranslation();
  //===========

  const handleLogout = async () => {
    setIsLoading(true);
    await dispatch(logout());
    setIsLoading(false);
    onClose();
  };

  return (
    <div className={s.modalWrapp}>
      {/* <h2 className={s.titleLogout}>Log out</h2>
      <p className={s.textLogout}>Do you really want to leave?</p> */}
      <h2 className={s.titleLogout}> {t("logOutModal.logOut")}</h2>
      <p className={s.textLogout}> {t("logOutModal.confirmation")}</p>

      <div className={s.wrappBtn}>
        <button
          type="button"
          className={s.btnLogout}
          onClick={handleLogout}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className={s.loaderContainer}>
              <Loader />
            </div>
          ) : (
            /* (Log out) */
            t("logOutModal.logOutBtn")
          )}
        </button>
        <button type="button" className={s.btnCancel} onClick={onClose}>
          {/* Cancel */}
          {t("logOutModal.cancelBtn")}
        </button>
      </div>
    </div>
  );
};

export default LogOutModal;
