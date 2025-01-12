import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import s from "./WaterForm.module.css";
import sprite from "../../../assets/sprite.svg";

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
              <use href={`${sprite}#icon-minus1`} />
            </svg>
          </button>

          <span className={s.amountValue}>{`${currentWaterAmount} ml`}</span>

          <button
            type="button"
            onClick={incrementWater}
            className={s.iconButton}
          >
            <svg className={s.icon}>
              <use href={`${sprite}#icon-plus2`} />
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
        />
        {errors.time && <p className={s.error}>{errors.time.message}</p>}
      </div>

      <div className={s.inputGroup}>
        <label className={s.valuelabel}>
          Enter the value of the water used:
        </label>
        <input
          type="number"
          className={s.input}
          value={currentWaterAmount}
          onChange={handleAmountInputChange}
        />
        {errors.amount && <p className={s.error}>{errors.amount.message}</p>}
      </div>

      <div className={s.buttons}>
        <button type="submit" className={s.submit}>
          Save
        </button>
        <button type="button" onClick={onClose} className={s.cancel}>
          Cancel
        </button>
      </div>
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
