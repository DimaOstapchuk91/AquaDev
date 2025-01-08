
import { useState } from "react";
import UserBar from "../UserBar/UserBar";
import ReactDOM from "react-dom";

import { IoSettingsOutline } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";

const UserPanel = ({ name, avatar }) => {
  const [settingModalOpen, setSettingModalOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  return (
    <div>
      <h2>
        Hello, <span>{name}!</span>
      </h2>
      <UserBar
        name={name}
        avatar={avatar}
        onSetting={() => setSettingModalOpen(true)}
        onLogout={() => setLogoutModalOpen(true)}
      />
      {settingModalOpen &&
        ReactDOM.createPortal(
          <div>
            <div>
              <p>
                <IoSettingsOutline />
                Setting
              </p>
              {/* <button onClick={() => setSettingModalOpen(false)}>Close</button> */}
            </div>
          </div>,
          document.body
        )}
      {logoutModalOpen &&
        ReactDOM.createPortal(
          <div>
            <div>
              <p>
                <LuLogOut />
                Logout
              </p>
              {/* <button onClick={() => setLogoutModalOpen(false)}>Close</button> */}
            </div>
          </div>,
          document.body
        )}

    </div>
  );
};

export default UserPanel;
