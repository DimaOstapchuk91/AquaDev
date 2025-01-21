import { useState, useRef } from "react";
import UserBarPopover from "../UserBarPopover/UserBarPopover";
import UserSettingsModal from "../Modal/UserSettingsModal/UserSettingsModal.jsx";
import LogOutModal from "../Modal/LogOutModal/LogOutModal.jsx";
import Modal from "../Modal/Modal.jsx";
import sprite from "../../assets/sprite.svg";
import s from "./UserBar.module.css";

const UserBar = ({ name, avatar }) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [settingModalOpen, setSettingModalOpen] = useState(false);
  const [logoutOpen, setlogoutOpen] = useState(false);

  const buttonRef = useRef(null);

  const handlePopoverOpen = () => setPopoverOpen((prev) => !prev);
  const handleClosePopover = () => setPopoverOpen(false);

  const handleSettingOpen = () => {
    setSettingModalOpen(true);
    handleClosePopover();
  };
  const handleSettingClose = () => {
    setSettingModalOpen(false);
  };

  const handleLogoutOpen = () => {
    setlogoutOpen(true);
    handleClosePopover();
  };
  const handleLogoutClose = () => {
    setlogoutOpen(false);
  };

  return (
    <div className={s.userBarContainer}>
      <button
        ref={buttonRef}
        onClick={handlePopoverOpen}
        className={s.userBarBtn}
      >
        <span className={s.span}>{name}</span>
        <img src={avatar} alt=" Avatar" className={s.userBarImg} />
        <svg
          className={`${s.userBarIcon} ${popoverOpen ? s.rotated : ""}`}
          width={16}
          height={16}
        >
          <use href={`${sprite}#icon-down`}></use>
        </svg>
      </button>
      {popoverOpen && (
        <UserBarPopover
          buttonRef={buttonRef}
          onClose={handleClosePopover}
          handleSettingOpen={handleSettingOpen}
          handleLogoutOpen={handleLogoutOpen}
        />
      )}
      <Modal isOpen={settingModalOpen} onClose={handleSettingClose}>
        <UserSettingsModal onClose={handleSettingClose} />
      </Modal>
      <Modal isOpen={logoutOpen} onClose={handleLogoutClose}>
        <LogOutModal onClose={handleLogoutClose} />
      </Modal>
    </div>
  );
};

export default UserBar;
