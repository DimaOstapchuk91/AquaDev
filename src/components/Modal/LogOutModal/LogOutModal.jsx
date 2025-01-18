import { logout } from "../../../redux/user/operations";
import s from "./LogOutModal.module.css";
import { useDispatch } from "react-redux";

const LogOutModal = ({ onClose }) => {
  const dispatch = useDispatch();

  return (
    <div className={s.modalWrapp}>
      <h2 className={s.titleLogout}>Log out</h2>
      <p className={s.textLogout}>Do you really want to leave?</p>
      <div className={s.wrappBtn}>
        <button
          type="button"
          className={s.btnLogout}
          onClick={() => dispatch(logout())}
        >
          Log out
        </button>
        <button type="button" className={s.btnCancel} onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LogOutModal;
