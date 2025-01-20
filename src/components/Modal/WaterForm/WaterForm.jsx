import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import s from "./WaterForm.module.css";
import sprite from "../../../assets/sprite.svg";
import { useDispatch } from "react-redux";
import {
  addWaterPortion,
  updateWaterPortion,
} from "../../../redux/water/operations.js";
import { validationSchemaWaterChange } from "../../../utils/formValidation.js";
import Loader from "../../Loader/Loader.jsx";

//=============
import { useTranslation } from "react-i18next";
//===========

const WaterForm = ({ subtitle, onClose, portionData, id, type }) => {
  //================
  const { t } = useTranslation();
  //==============
  const [isLoading, setIsLoading] = useState(false);
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

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      if (type === "add") {
        await dispatch(addWaterPortion(data));
      } else if (type === "edit") {
        await dispatch(updateWaterPortion({ id, data }));
      }
      onClose();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <p className={s.subtitle}>{subtitle}</p>

      <div className={s.inputGroup}>
        {/* <label className={s.label}>Amount of water:</label> */}
        <label className={s.label}>{t("waterForm.waterAmount")}</label>
        <div className={s.counter}>
          <button
            type="button"
            onClick={() => {
              const newValue = Math.max(getValues("amount") - 50, 1);
              setValue("amount", newValue);
            }}
            className={s.iconButton}
          >
            <svg className={s.icon}>
              <use href={`${sprite}#icon-minus1`} />
            </svg>
          </button>
          {/* <span className={s.amountValue}>{`${watchedAmount} ml`}</span> */}
          <span className={s.amountValue}>{`${watchedAmount} ${t(
            "waterForm.ml"
          )}`}</span>

          <button
            type="button"
            onClick={() => {
              const newValue = Math.min(getValues("amount") + 50, 10000);
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
        {/* <label className={s.timelabel}>Recording time:</label> */}
        <label className={s.timelabel}>{t("waterForm.recordingTime")}</label>

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
          {/* Enter the value of the water used: */}
          {t("waterForm.enterValue")}
        </label>
        <Controller
          name="amount"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="number"
              className={s.input}
              onChange={(e) => {
                const value = Math.min(
                  Math.max(Number(e.target.value), 1),
                  10000
                );
                field.onChange(value);
              }}
            />
          )}
        />
        {errors.amount && <p className={s.error}>{errors.amount.message}</p>}
      </div>

      <div className={s.wrappBtn}>
        <button type="submit" className={s.submit} disabled={isLoading}>
          {/* {isLoading ? <Loader /> : "Save"} */}
          {isLoading ? <Loader /> : t("waterForm.saveBtn")}
        </button>
        <button type="button" onClick={onClose} className={s.cancel}>
          {/* Cancel */}
          {t("waterForm.cancelBtn")}
        </button>
      </div>
    </form>
  );
};

export default WaterForm;
