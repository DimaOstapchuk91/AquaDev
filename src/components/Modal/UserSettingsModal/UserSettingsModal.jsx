import UserSettingsForm from "../UserSettingsForm/UserSettingsForm";
import { useTranslation } from "react-i18next";
import s from "./UserSettingsModal.module.css";

const UserSettingsModal = ({ onClose, user }) => {
  const { t } = useTranslation();

  return (
    <div className={s.modalContent}>
      <h2 className={s.title}>{t("userSettingsForm.settings")}</h2>
      <UserSettingsForm user={user} onClose={onClose} />
    </div>
  );
};

export default UserSettingsModal;
