import { useEffect, useRef, useState } from "react";
import sprite from "../../assets/sprite.svg";
import s from "./UserBarPopover.module.css";
import { useTranslation } from "react-i18next";

const UserBarPopover = ({
  buttonRef,
  onClose,
  handleSettingOpen,
  handleLogoutOpen,
}) => {
  const [visible, setVisible] = useState(false);
  const popoverRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 0);
    const handleClickOutside = (event) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setVisible(false);
        setTimeout(onClose, 300);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose, buttonRef]);

  return (
    <div
      ref={popoverRef}
      className={`${s.popoverContainer} ${visible ? s.visib : ""}`}
    >
      <button onClick={handleSettingOpen} className={s.popoverBtn}>
        <svg className={`${s.popoverIcons}`} width={16} height={16}>
          <use href={`${sprite}#icon-settings`}></use>
        </svg>
        {t("userBarPopover.setting")}
      </button>
      <button
        onClick={handleLogoutOpen}
        className={`${s.popoverBtn} ${s.popoverBtnLogout} `}
      >
        <svg
          className={`${s.popoverIcons} ${s.iconsLogout}`}
          width={16}
          height={16}
        >
          <use href={`${sprite}#icon-log-out`}></use>
        </svg>
        {t("userBarPopover.logout")}
      </button>
    </div>
  );
};

export default UserBarPopover;
