import React from "react";
import clsx from "clsx";
import s from "./AddWaterBtn.module.css";

const AddWaterBtn = ({ customClassName }) => {
  const handleAddWaterBtnClick = () => {
    //   tbd openning Modal...some state?
  };

  return (
    <button
      type="button"
      onClick={handleAddWaterBtnClick}
      className={clsx(s[customClassName])}
    >
      <div className={s.textContainer}>
        <span className={s.spanContainer}>+</span> Add water
      </div>
    </button>
  );
};

export default AddWaterBtn;
