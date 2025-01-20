import UserSettingsForm from '../UserSettingsForm/UserSettingsForm';
import s from './UserSettingsModal.module.css';

const UserSettingsModal = ({ onClose, user }) => {
  return (
    <div className={s.modalContent}>
      <h2 className={s.title}>Setting</h2>
      <UserSettingsForm user={user} onClose={onClose} />
    </div>
  );
};

export default UserSettingsModal;
