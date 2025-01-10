import { useState, useEffect } from "react";

const ChooseDate = ({ selectedDate, onDateChange }) => {
  const [currentDate, setCurrentDate] = useState(
    selectedDate || new Date().toISOString().trim("T")[0]
  );
  useEffect(() => {
    if (!selectedDate) {
      onDateChange(currentDate);
    }
  }, [currentDate, selectedDate, onDateChange]);

  const handleDateChange=(e)=>{
    setCurrentDate(e.target.value)
    onDateChange(e.target.value)
  }
  return <div><label htmlFor="choose-date">обрати дату:</label>
  <input type="date" id="choose-date" value={currentDate} onChange={handleDateChange}/></div>;
};
export default ChooseDate;
