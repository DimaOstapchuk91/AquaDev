import { logout } from "../../../redux/user/operations";
import s from "./LogOutModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Loader/Loader.jsx";
import { selectLoading } from "../../../redux/water/selectors.js";

const LogOutModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);

  const handleLogout = async () => {
    await dispatch(logout());
    onClose();
  };

  return (
    <div className={s.modalWrapp}>
      <h2 className={s.titleLogout}>Log out</h2>
      <p className={s.textLogout}>Do you really want to leave?</p>
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
            "Log out"
          )}
        </button>
        <button type="button" className={s.btnCancel} onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LogOutModal;
