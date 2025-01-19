import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import s from "./WaterForm.module.css";
import sprite from "../../../assets/sprite.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  addWaterPortion,
  updateWaterPortion,
} from "../../../redux/water/operations.js";
import { validationSchemaWaterChange } from "../../../utils/formValidation.js";
import { selectLoading } from "../../../redux/water/selectors.js";
import Loader from "../../Loader/Loader.jsx";

const WaterForm = ({ subtitle, onClose, portionData, id, type }) => {
  const isLoading = useSelector(selectLoading);
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
    watch,
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

  const watchedAmount = watch("amount");

  useEffect(() => {
    if (portionData) {
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
  }, [portionData, reset]);

  const handleBlur = () => {
    if (portionData) {
      setValue("amount", portionData.amount);
    } else {
      setValue("amount", 50);
    }
  };

  const onSubmit = async (data) => {
    if (type === "add") {
      await dispatch(addWaterPortion(data));
    } else if (type === "edit") {
      await dispatch(updateWaterPortion({ id, data }));
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
            onClick={() => {
              const newValue = Math.max(getValues("amount") - 50, 50);
              setValue("amount", newValue);
            }}
            className={s.iconButton}
          >
            <svg className={s.icon}>
              <use href={`${sprite}#icon-minus1`} />
            </svg>
          </button>
          <span className={s.amountValue}>{`${watchedAmount} ml`}</span>
          <button
            type="button"
            onClick={() => {
              const newValue = Math.min(getValues("amount") + 50, 2000);
              setValue("amount", newValue);
            }}
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
        <Controller
          name="amount"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="number"
              name="amount"
              className={s.input}
              onBlur={handleBlur}
            />
          )}
        />
        {errors.amount && <p className={s.error}>{errors.amount.message}</p>}
      </div>

      <div className={s.wrappBtn}>
        <button type="submit" className={s.submit} disabled={isLoading}>
          {isLoading ? <Loader className={s.submitLoader} /> : "Save"}{" "}
        </button>
        <button
          type="button"
          onClick={onClose}
          className={s.cancel}
          disabled={isLoading}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default WaterForm;
