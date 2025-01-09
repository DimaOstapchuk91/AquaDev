import { useState } from "react";
import UserBarPopover from "../UserBarPopover/UserBarPopover";

const UserBar = ({ name, avatar, onSetting, onLogout }) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const handlePopoverOpen = () => setPopoverOpen(!popoverOpen);

  return (
    <div>
      <button onClick={handlePopoverOpen}>
        {name}
        <img src={avatar} alt="User avatar" />
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
