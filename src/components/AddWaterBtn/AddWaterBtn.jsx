import React from "react";
import clsx from "clsx";
import s from "./AddWaterBtn.module.css";
import sprite from "../../assets/sprite.svg";
import { useTranslation } from "react-i18next";
const AddWaterBtn = ({ customClassName, onClick }) => {
  const { t } = useTranslation();
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
        {t("addWaterBtn.addWater")}
      </div>
    </button>
  );
};

export default AddWaterBtn;
