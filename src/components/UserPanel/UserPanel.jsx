// import { useState } from "react";
import UserBar from "../UserBar/UserBar";

const UserPanel = ({ name, avatar }) => {
  return (
    <div>
      <h2>
        Hello, <span>{name}Nadia!</span>
      </h2>
      <UserBar name={name} avatar={avatar} />
    </div>
  );
};

export default UserPanel;
