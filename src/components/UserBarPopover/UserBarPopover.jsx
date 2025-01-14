import { useEffect, useRef, useState } from "react";
import UserSettingsModal from "../Modal/UserSettingsModal/UserSettingsModal.jsx";
import LogOutModal from "../Modal/LogOutModal/LogOutModal.jsx";
import Modal from "../Modal/Modal.jsx";
import sprite from "../../assets/sprite.svg";
import s from "./UserBarPopover.module.css";

const UserBarPopover = ({ buttonRef, onClose }) => {
  const [settingModalOpen, setSettingModalOpen] = useState(false);
  const [logoutOpen, setlogoutOpen] = useState(false);
  const popoverRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose, buttonRef]);

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
    <div ref={popoverRef}>
      <div className={s.popoverContainer}>
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
