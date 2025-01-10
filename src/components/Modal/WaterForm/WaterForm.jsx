import React, { useState } from "react";
import PropTypes from "prop-types";

const WaterForm = ({ type, initialData = {}, onClose }) => {
  const [amount, setAmount] = useState(initialData.amount || 50);
  const [time, setTime] = useState(
    initialData.time ||
      new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );

  const handleIncrement = () => setAmount((prev) => prev + 50);
  const handleDecrement = () => setAmount((prev) => (prev > 0 ? prev - 50 : 0));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      amount,
      time,
    });
    onClose();
  };

  return (
    <form className="water-form" onSubmit={handleSubmit}>
      <div className="water-counter">
        <button type="button" onClick={handleDecrement}>
          -
        </button>
        <span>{amount} ml</span>
        <button type="button" onClick={handleIncrement}>
          +
        </button>
      </div>

      <div className="water-time">
        <label htmlFor="water-time">Recording time:</label>
        <input
          type="time"
          id="water-time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>

      <div className="water-amount-input">
        <label htmlFor="water-amount">Enter the value of the water used:</label>
        <input
          type="number"
          id="water-amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          min="0"
        />
      </div>

      <button type="submit">Save</button>
    </form>
  );
};

WaterForm.propTypes = {
  type: PropTypes.oneOf(["add", "edit"]).isRequired,
  initialData: PropTypes.shape({
    amount: PropTypes.number,
    time: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
};

export default WaterForm;
