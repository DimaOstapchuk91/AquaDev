import { useState, useRef } from "react";
import UserBarPopover from "../UserBarPopover/UserBarPopover";
import sprite from "../../assets/sprite.svg";
import s from "./UserBar.module.css";

const UserBar = ({ name, avatar }) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const buttonRef = useRef(null);

  const handlePopoverOpen = () => setPopoverOpen((prev) => !prev);
  const handleClosePopover = () => setPopoverOpen(false);

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
        <UserBarPopover buttonRef={buttonRef} onClose={handleClosePopover} />
      )}
    </div>
  );
};

export default UserBar;
