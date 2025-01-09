import UserSettingsForm from "../UserSettingsForm/UserSettingsForm";
import Modal from "../Modal.jsx";
import s from "./UserSettingsModal.module.css";

const UserSettingsModal = ({ isOpen, onClose, user }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={s.backdrop}>
        <div className={s.modal}>
          <div className={s.modalContent}>
            <h2 className={s.modalTitle}>UserSettingsForm</h2>
            <UserSettingsForm user={user} onClose={onClose} />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UserSettingsModal;
