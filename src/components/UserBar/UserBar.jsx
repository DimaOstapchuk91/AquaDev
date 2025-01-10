import { useState } from "react";

import UserBarPopover from "../UserBarPopover/UserBarPopover";

import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";

import s from "./UserBar.module.css";

const UserBar = ({ name, avatar, onSetting, onLogout }) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const handlePopoverOpen = () => setPopoverOpen(!popoverOpen);

  return (
    <div>
      <button onClick={handlePopoverOpen} className={s.userBarBtn}>
        {name}Nadia
        <img src={avatar} alt="avatar" className={s.userBarImg} />
        {popoverOpen ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      {popoverOpen && (
        <UserBarPopover
          onClose={() => setPopoverOpen(false)}
          onSetting={onSetting}
          onLogout={onLogout}
        />
      )}
    </div>
  );
};

export default UserBar;
