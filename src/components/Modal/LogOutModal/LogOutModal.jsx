import s from "./LogOutModal.module.css";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/user/operations";
import { useTranslation } from "react-i18next";

const LogOutModal = ({ onClose }) => {
  const dispatch = useDispatch();

  //================
  const { t } = useTranslation();
  //===============

  return (
    <div className={s.modalWrapp}>
      {/* <h2 className={s.titleLogout}>Log out</h2>
      <p className={s.textLogout}>Do you really want to leave?</p> */}
      <h2 className={s.titleLogout}> {t("logOutModal.logOut")}</h2>
      <p className={s.textLogout}> {t("logOutModal.confirmation")}</p>
      <div className={s.boxForBtn}>
        <button
          type="button"
          className={s.btnLogout}
          onClick={() => dispatch(logout())}
        >
          {/* Log out */}
          {t("logOutModal.logOutBtn")}
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
