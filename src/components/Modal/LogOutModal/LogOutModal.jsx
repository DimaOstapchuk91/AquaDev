import s from "./LogOutModal.module.css";
import Modal from "../Modal.jsx";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/user/operations";

const LogOutModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={s.modal}>
        <div className={s.modalWrapper}>
          <div className={s.modalContent}>
            <h2 className={s.titleLogout}>Log out</h2>
            <p className={s.textLogout}>Do you really want to leave?</p>
            <div className={s.boxForBtn}>
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
        </div>
      </div>
    </Modal>
  );
};

export default LogOutModal;
