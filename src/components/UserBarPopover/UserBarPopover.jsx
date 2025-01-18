import { useEffect, useRef } from "react";
import sprite from "../../assets/sprite.svg";
import s from "./UserBarPopover.module.css";
//========================
import { useTranslation } from "react-i18next";

const UserBarPopover = ({ buttonRef, onClose, openModal }) => {
  //============================
  const { t } = useTranslation();
  //=======================
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose, buttonRef]);

  return (
    <div ref={popoverRef} className={s.popoverContainer}>
      <button onClick={() => openModal("Setting")} className={s.popoverBtn}>
        <svg className={s.popoverIcons} width={16} height={16}>
          <use href={`${sprite}#icon-settings`}></use>
        </svg>
        {/* Setting */}
        {t("userBarPopover.setting")}
      </button>
      <button onClick={() => openModal("Logout")} className={s.popoverBtn}>
        <svg className={s.popoverIcons} width={16} height={16}>
          <use href={`${sprite}#icon-log-out`}></use>
        </svg>
        {/* Logout */}
        {t("userBarPopover.logout")}
      </button>
    </div>
  );
};

export default UserBarPopover;
