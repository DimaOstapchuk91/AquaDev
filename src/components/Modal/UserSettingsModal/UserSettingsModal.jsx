import UserSettingsForm from "../UserSettingsForm/UserSettingsForm";
import s from "./UserSettingsModal.module.css";

const UserSettingsModal = () => {
  return (
    <div className={s.modal}>
      <div className={s.modalContent}>
        <h2 className={s.modalTitle}>User Settings</h2>
        <UserSettingsForm />
      </div>
    </div>
  );
};

export default UserSettingsModal;
