import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./WaterForm.module.css";
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
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.amountContainer}>
        <h3 className={styles.waterTitle}>Amount of water:</h3>
        <div className={styles.waterCounter}>
           <button  className={styles.amountButton} type="button" onClick={handleDecrement}>
          -
        </button>
        <span className={styles.amount}>{amount} ml</span>
        <button className={styles.amountButton} type="button" onClick={handleIncrement}>
          +
        </button>
        </div>
      </div>

      <div className="water-time">
        <label className={styles.label} htmlFor="water-time">Recording time:</label>
        <input
          type="time"
          id="water-time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className={styles.input}
        />
      </div>

      <div className="water-amount-input">
        <label  className={styles.labelWater} htmlFor="water-amount">Enter the value of the water used:</label>
        <input
          type="number"
          id="water-amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          min="0"
          className={styles.input}
        />
      </div>
      <button type="submit"  className={styles.saveButton}>
            Save
      </button>
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
