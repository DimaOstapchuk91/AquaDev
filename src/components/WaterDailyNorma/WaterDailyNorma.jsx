import React from "react";
import s from "./WaterDailyNorma.module.css";

const WaterDailyNorma = () => {
  return (
    <div className={s.dailyNormaContainer}>
      {/* hardcoded value, need to change with value from state */}
      <p className={s.dailyNormaAmount}>1.5 L</p>
      <p className={s.subtitle}>My daily norma</p>
    </div>
  );
};

export default WaterDailyNorma;
