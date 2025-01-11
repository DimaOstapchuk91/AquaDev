import { useState, useRef } from "react";

import UserBarPopover from "../UserBarPopover/UserBarPopover";

// import { FaChevronDown } from "react-icons/fa";
// import { FaChevronUp } from "react-icons/fa";

import s from "./UserBar.module.css";

import sprite from "../../assets/sprite.svg";

const UserBar = ({ name, avatar }) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const buttonRef = useRef(null);

  const handlePopoverOpen = () => setPopoverOpen((prev) => !prev);
  const handleClosePopover = () => setPopoverOpen(false);

  return (
    <div>
      <button
        ref={buttonRef}
        onClick={handlePopoverOpen}
        className={s.userBarBtn}
      >
        {name}Nadia
        <img src={avatar} alt="avatar" className={s.userBarImg} />
        <svg className={s.userBarIcon} width={16} height={16}>
          <use href={`${sprite}#icon-down`}></use>
        </svg>
        {/* {popoverOpen ? <FaChevronUp /> : <FaChevronDown />} */}
      </button>
      {popoverOpen && (
        <UserBarPopover
          buttonRef={buttonRef}
          onClose={handleClosePopover}
          openModal={(modalType) => console.log(`Open ${modalType} modal`)}
        />
      )}
    </div>
  );
};

export default UserBar;
