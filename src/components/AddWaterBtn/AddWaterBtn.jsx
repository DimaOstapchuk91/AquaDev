import React from "react";
import clsx from "clsx";
import s from "./AddWaterBtn.module.css";

const AddWaterBtn = ({ customClassName, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(s[customClassName])}
    >
      <div className={s.textContainer}>
        <span className={s.spanContainer}>+</span> Add water
      </div>
    </button>
  );
};

export default AddWaterBtn;
