import React from "react";
import clsx from "clsx";
import s from "./AddWaterBtn.module.css";
import sprite from '../../assets/sprite.svg'
const AddWaterBtn = ({ customClassName, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(s[customClassName])}
    >
      <div className={s.textContainer}>
        <span className={s.spanContainer}>
          <svg className={s.plus} width="16" height="16">
            <use href={`${sprite}#icon-plus`}></use>
          </svg>
        </span>
        Add water
      </div>
    </button>
  );
};

export default AddWaterBtn;
