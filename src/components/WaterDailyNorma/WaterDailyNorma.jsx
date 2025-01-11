// import React from "react";
import s from './WaterDailyNorma.module.css';

const WaterDailyNorma = ({ dailyNorma }) => {
  return (
    <div className={s.dailyNormaContainer}>
      <p className={s.dailyNormaAmount}>{dailyNorma} L</p>
      <p className={s.subtitle}>My daily norma</p>
    </div>
  );
};

export default WaterDailyNorma;
