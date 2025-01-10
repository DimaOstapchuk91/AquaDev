import { useState, useEffect } from "react";

const ChooseDate = ({ selectedDate, onDateChange }) => {
  const [currentDate, setCurrentDate] = useState(
    selectedDate || new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    if (!selectedDate) {
      onDateChange(currentDate);
    }
  }, [currentDate, selectedDate, onDateChange]);

  const handleDateChange = (event) => {
    setCurrentDate(event.target.value);
    onDateChange(event.target.value);
  };

  return (
    <div>
      <label htmlFor="choose-date">Обрати дату:</label>
      <input
        type="date"
        id="choose-date"
        value={currentDate}
        onChange={handleDateChange}
      />
    </div>
  );
};
export default ChooseDate;
