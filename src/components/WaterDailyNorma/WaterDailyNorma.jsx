// import React from "react";
import { useTranslation } from "react-i18next";
import s from "./WaterDailyNorma.module.css";

const WaterDailyNorma = ({ dailyNorma }) => {
  //================
  const { t } = useTranslation();
  //================
  return (
    <div className={s.dailyNormaContainer}>
      {/* <p className={s.dailyNormaAmount}>{dailyNorma} L</p> */}
      <p className={s.dailyNormaAmount}>
        {dailyNorma} {t("waterDashboard.litre")}
      </p>

      {/* <p className={s.subtitle}>My daily norma</p> */}
      <p className={s.subtitle}>{t("waterDashboard.dailyNorm")}</p>
    </div>
  );
};

export default WaterDailyNorma;
