import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import s from "./WaterForm.module.css";
import sprite from "../../../assets/sprite.svg";
import { useDispatch } from "react-redux";
import {
  addWaterPortion,
  updateWaterPortion,
} from "../../../redux/water/operations.js";
import { validationSchemaWaterChange } from "../../../../utils/formValidation.js";

const WaterForm = ({ subtitle, onClose, portionData, type }) => {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm({
    resolver: yupResolver(validationSchemaWaterChange),
    defaultValues: {
      amount: portionData ? portionData.amount : 50,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  });

  useEffect(() => {
    if (type === "edit" && portionData) {
      reset({
        amount: portionData.amount,
        time:
          portionData.time ||
          new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
      });
    }
  }, [portionData, type, reset]);

  const handleWaterChange = (value) => {
    const newValue = Math.min(Math.max(value, 50), 10000);
    reset({ amount: newValue, time: getValues("time") });
  };

  const onSubmit = async (data) => {
    if (type === "add") {
      dispatch(addWaterPortion(data));
    } else if (type === "edit") {
      dispatch(updateWaterPortion(portionData.id, data));
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <p className={s.subtitle}>{subtitle}</p>

      <div className={s.inputGroup}>
        <label className={s.label}>Amount of water:</label>
        <div className={s.counter}>
          <button
            type="button"
            onClick={() => handleWaterChange(getValues("amount") - 50)}
            className={s.iconButton}
          >
            <svg className={s.icon}>
              <use href={`${sprite}#icon-minus1`} />
            </svg>
          </button>
          <span className={s.amountValue}>{`${getValues("amount")} ml`}</span>
          <button
            type="button"
            onClick={() => handleWaterChange(getValues("amount") + 50)}
            className={s.iconButton}
          >
            <svg className={s.icon}>
              <use href={`${sprite}#icon-plus2`} />
            </svg>
          </button>
        </div>
        {errors.amount && <p className={s.error}>{errors.amount.message}</p>}
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
          value={getValues("amount")}
          onChange={(e) => handleWaterChange(Number(e.target.value))}
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

export default WaterForm;
