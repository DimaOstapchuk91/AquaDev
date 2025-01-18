// import { useState, useEffect } from "react";

import { useTranslation } from "react-i18next";

const ChooseDate = ({ selectedDate, onDateChange }) => {
  const { t } = useTranslation();

  //   const [currentDate, setCurrentDate] = useState(
  //     selectedDate || new Date().toISOString().trim("T")[0]
  //   );
  //   useEffect(() => {
  //     if (!selectedDate) {
  //       onDateChange(currentDate);
  //     }
  //   }, [currentDate, selectedDate, onDateChange]);

  //   const handleDateChange = (e) => {
  //     setCurrentDate(e.target.value);
  //     onDateChange(e.target.value);
  //   };
  return (
    <div>
      {/* <p>Today</p> */}
      <p>{t("chooseDate")}</p>
    </div>
  );
};
export default ChooseDate;
