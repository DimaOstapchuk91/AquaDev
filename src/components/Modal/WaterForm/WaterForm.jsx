<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import s from "./WaterForm.module.css";

const validationSchema = Yup.object().shape({
  amount: Yup.number()
    .required("Amount is required")
    .positive("Amount must be greater than 0")
    .integer("Amount must be an integer")
    .min(1, "Amount must be at least 1 ml")
    .max(10000, "Amount cannot exceed 10,000 ml"),
  time: Yup.string()
    .required("Time is required")
    .matches(
      /^([01]?[0-9]|2[0-3]):([0-5]?[0-9])$/,
      "Invalid time format (hh:mm)"
    ),
});

const WaterForm = ({ subtitle, onClose, water, type }) => {
  const [currentWaterAmount, setCurrentWaterAmount] = useState(
    water ? water.amount : 50
=======
import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./WaterForm.module.css";
const WaterForm = ({ type, initialData = {}, onClose }) => {
  const [amount, setAmount] = useState(initialData.amount || 50);
  const [time, setTime] = useState(
    initialData.time ||
      new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
>>>>>>> b8246ad15530f40818f2d348eb1f574b8273b469
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      amount: currentWaterAmount,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  });

  useEffect(() => {
    if (type === "edit" && water) {
      setCurrentWaterAmount(water.amount);
      reset({
        amount: water.amount,
        time:
          water.time ||
          new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
      });
    }
  }, [water, type, reset]);

  const onSubmit = async (data) => {
    try {
      const dataToSend = {
        amount: data.amount,
        time: data.time,
      };

      let response;

      if (type === "add") {
        response = await addWater(dataToSend);
      } else if (type === "edit") {
        response = await putWater(water.id, dataToSend);
      }

      if (response.success) {
        onClose();
      } else {
        alert("Error: Failed to submit the data!");
      }
    } catch (error) {
      alert("Error while submitting: " + error.message);
    }
  };

  const incrementWater = () =>
    setCurrentWaterAmount((prev) => {
      const newValue = Math.min(prev + 50, 10000);
      reset({ amount: newValue, time: getValues("time") });
      return newValue;
    });

  const decrementWater = () =>
    setCurrentWaterAmount((prev) => {
      const newValue = Math.max(prev - 50, 1);
      reset({ amount: newValue, time: getValues("time") });
      return newValue;
    });

  const handleAmountInputChange = (e) => {
    const value = Number(e.target.value);
    if (value >= 0 && value <= 10000) {
      setCurrentWaterAmount(value);
      reset({ amount: value, time: getValues("time") });
    }
  };

  return (
<<<<<<< HEAD
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <p className={s.subtitle}>{subtitle}</p>

      <div className={s.inputGroup}>
        <label className={s.label}>Amount of water:</label>
        <div className={s.counter}>
          <button
            type="button"
            onClick={decrementWater}
            className={s.iconButton}
          >
            <svg className={s.icon}>
              <use xlinkHref="/src/assets/sprite.svg#icon-minus1" />
            </svg>
          </button>

          <span className={s.amountValue}>{`${currentWaterAmount} ml`}</span>

          <button
            type="button"
            onClick={incrementWater}
            className={s.iconButton}
          >
            <svg className={s.icon}>
              <use xlinkHref="/src/assets/sprite.svg#icon-plus2" />
            </svg>
          </button>
        </div>
        {errors.waterInput && (
          <p className={s.error}>{errors.waterInput.message}</p>
        )}
      </div>

      <div className={s.inputGroup}>
        <label className={s.timelabel}>Recording time:</label>
        <Controller
          name="time"
          control={control}
          render={({ field }) => (
            <input {...field} type="time" className={s.input} />
          )}
=======
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
>>>>>>> b8246ad15530f40818f2d348eb1f574b8273b469
        />
        {errors.time && <p className={s.error}>{errors.time.message}</p>}
      </div>

<<<<<<< HEAD
      <div className={s.inputGroup}>
        <label className={s.valuelabel}>
          Enter the value of the water used:
        </label>
        <input
          type="number"
          className={s.input}
          value={currentWaterAmount}
          onChange={handleAmountInputChange}
=======
      <div className="water-amount-input">
        <label  className={styles.labelWater} htmlFor="water-amount">Enter the value of the water used:</label>
        <input
          type="number"
          id="water-amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          min="0"
          className={styles.input}
>>>>>>> b8246ad15530f40818f2d348eb1f574b8273b469
        />
        {errors.amount && <p className={s.error}>{errors.amount.message}</p>}
      </div>
<<<<<<< HEAD

      {/* Кнопки Save и Cancel */}
      <div className={s.buttons}>
        <button type="submit" className={s.submit}>
          Save
        </button>
        <button type="button" onClick={onClose} className={s.cancel}>
          Cancel
        </button>
      </div>
=======
      <button type="submit"  className={styles.saveButton}>
            Save
      </button>
>>>>>>> b8246ad15530f40818f2d348eb1f574b8273b469
    </form>
  );
};

const addWater = async (data) => {
  console.log("Adding water:", data);
  return { success: true };
};

const putWater = async (id, data) => {
  console.log(`Updating water with ID ${id}:`, data);
  return { success: true };
};

export default WaterForm;
