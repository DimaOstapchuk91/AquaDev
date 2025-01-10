import { useEffect, useRef, useState } from "react";

import { LuSettings } from "react-icons/lu";
import { LuLogOut } from "react-icons/lu";

import s from "./UserBarPopover.module.css";

const UserBarPopover = ({ buttonRef, onClose, openModal }) => {
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
        <LuSettings className={s.popoverIcons} /> Setting
      </button>
      <button onClick={() => openModal("Logout")} className={s.popoverBtn}>
        <LuLogOut className={s.popoverIcons} /> Logout
      </button>
    </div>
  );
};

export default UserBarPopover;
