import { useEffect } from "react";

import s from "./Modal.module.css";

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={s.backdrop} onClick={onClose}>
      <div className={s.window} onClick={(e) => e.stopPropagation()}>
        <button className={s.button} onClick={onClose}>
          <svg className={s.icon} aria-hidden="true">
            <use xlinkHref="/src/assets/sprite.svg#icon-x-1" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
