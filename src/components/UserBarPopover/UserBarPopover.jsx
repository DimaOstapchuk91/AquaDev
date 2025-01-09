import { useState, useEffect, useRef } from "react";

const UserBarPopover = ({ onClose, onSetting, onLogout }) => {
  const popoverRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div ref={popoverRef}>
      <button onClick={onSetting}>Setting</button>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default UserBarPopover;
