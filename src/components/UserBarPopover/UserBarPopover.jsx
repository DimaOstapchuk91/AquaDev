import { useRef, useState } from "react";

import sprite from "../../assets/sprite.svg";
import s from "./UserBarPopover.module.css";

import UserSettingsModal from "../Modal/UserSettingsModal/UserSettingsModal.jsx";
import LogOutModal from "../Modal/LogOutModal/LogOutModal.jsx";

import Modal from "../Modal/Modal.jsx";

const UserBarPopover = () => {
  const [settingModalOpen, setSettingModalOpen] = useState(false);
  const [logoutOpen, setlogoutOpen] = useState(false);
  const popoverRef = useRef(null);

  const handleSettingOpen = () => {
    setSettingModalOpen(true);
  };
  const handleSettingClose = () => {
    setSettingModalOpen(false);
  };

  const handleLogoutOpen = () => {
    setlogoutOpen(true);
  };
  const handleLogoutClose = () => {
    setlogoutOpen(false);
  };

  return (
    <div ref={popoverRef} className={s.popoverContainer}>
      <div>
        <button onClick={handleSettingOpen} className={s.popoverBtn}>
          <svg className={s.popoverIcons} width={16} height={16}>
            <use href={`${sprite}#icon-settings`}></use>
          </svg>
          Setting
        </button>
        <button onClick={handleLogoutOpen} className={s.popoverBtn}>
          <svg className={s.popoverIcons} width={16} height={16}>
            <use href={`${sprite}#icon-log-out`}></use>
          </svg>
          Log out
        </button>
      </div>
      <Modal isOpen={settingModalOpen} onClose={handleSettingClose}>
        <UserSettingsModal
          isOpen={settingModalOpen}
          onClose={handleSettingClose}
        />
      </Modal>
      <Modal isOpen={logoutOpen} onClose={handleLogoutClose}>
        <LogOutModal onClose={handleLogoutClose} />
      </Modal>
    </div>
  );
};

export default UserBarPopover;
