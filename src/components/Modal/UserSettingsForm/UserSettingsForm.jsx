import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSettingsSchema } from "../../../utils/formValidation.js";
import { updateUser } from "../../../redux/user/operations.js";
import sprite from "../../../assets/sprite.svg";
import {
  selectUser,
  selectIsRefreshing,
} from "../../../redux/user/selectors.js";
import s from "./UserSettingsForm.module.css";
import Loader from "../../Loader/Loader.jsx";
import { useTranslation } from "react-i18next";

const UserSettingsForm = ({ onClose }) => {
  const { name, email, gender, weight, timeActive, dailyNorma, avatar } =
    useSelector(selectUser);
  const { t } = useTranslation();
  const [avatarPreview, setAvatarPreview] = useState(avatar || null);
  const loader = useSelector(selectIsRefreshing);
  const [notification, setNotification] = useState(null);

  const dispatch = useDispatch();

  const userName = name ? name : email;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSettingsSchema),
    defaultValues: {
      gender: gender,
      name: name,
      email: email,
      weight: weight || 0,
      timeActive: timeActive || 0,
      dailyNorma: dailyNorma / 1000 || calculateWaterIntake(gender) || 2,
    },
    shouldUnregister: true,
    // mode: 'onChange',
  });

  const newWeight = watch("weight");
  const newActiveTime = watch("timeActive");
  const genderValue = watch("gender");

  const calculateWaterIntake = (gender) => {
    if (gender === "woman") {
      return Number((newWeight * 0.03 + newActiveTime * 0.4).toFixed(1));
    } else {
      return Number((newWeight * 0.04 + newActiveTime * 0.6).toFixed(1));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarPreview(file);
    }
  };

  const handleBlur = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    if (!fieldValue && fieldName === "name") {
      setValue("name", name);
    }
    if (!fieldValue && fieldName === "weight") {
      setValue("weight", weight || 0);
    }
    if (!fieldValue && fieldName === "timeActive") {
      setValue("timeActive", timeActive || 0);
    }
    if (!fieldValue && fieldName === "dailyNorma") {
      setValue("dailyNorma", dailyNorma / 1000 || 2000 / 1000);
    }
  };

  useEffect(() => {
    setValue("dailyNorma", calculateWaterIntake(genderValue));
  }, [genderValue, newActiveTime, newWeight]);

  const onSubmit = async (data) => {
    const initialValues = {
      gender: gender,
      name: name,
      email: email,
      weight: weight,
      timeActive: timeActive,
      dailyNorma: dailyNorma / 1000,
    };

    const changedData = Object.keys(data).reduce((acc, key) => {
      if (key === "dailyNorma" && data[key] !== initialValues[key]) {
        acc[key] = data[key] * 1000;
      } else if (data[key] !== initialValues[key]) {
        acc[key] = data[key];
      }
      return acc;
    }, {});

    if (avatarPreview !== avatar) {
      changedData.avatar = avatarPreview;
    }

    if (!changedData.customWaterIntake) {
      delete changedData.customWaterIntake;
    }

    if (Object.keys(changedData).length === 0) {
      return;
    }

    const formData = new FormData();

    Object.keys(changedData).forEach((key) => {
      if (key === "avatar" && avatarPreview instanceof File) {
        formData.append("avatar", avatarPreview);
      } else {
        formData.append(key, changedData[key]);
      }
    });

    const updateUserData = async () => {
      await dispatch(updateUser(formData));
    };

    await updateUserData();
    setNotification({
      type: "success",
      message: "Your settings have been successfully saved!",
    });

    onClose();
  };

  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : "U");

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={s.avatarContainer}>
        {avatarPreview ? (
          avatarPreview instanceof File ? (
            <img
              src={URL.createObjectURL(avatarPreview)}
              alt="Avatar Preview"
              className={s.avatar}
            />
          ) : (
            <img
              src={avatarPreview}
              alt="Avatar Preview"
              className={s.avatar}
            />
          )
        ) : avatar ? (
          <img src={avatar} alt="User Avatar" className={s.avatar} />
        ) : (
          <div className={s.avatarPlaceholder}>{getInitial(userName)}</div>
        )}
      </div>
      <label className={s.uploadLabel}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className={s.uploadInput}
        />
        <div className={s.img}>
          <svg width="20" height="20" className={s.upload}>
            <use href={`${sprite}#icon-upload`}></use>
          </svg>
          {/* <span className={s.uploadBtn}>Upload a photo</span> */}
          <span className={s.uploadBtn}>
            {t("userSettingsForm.uploadPhoto")}
          </span>
        </div>
      </label>
      <div className={s.mainContainer}>
        <div className={s.leftColumn}>
          {/* <label className={s.labelGender}>Your gender identity</label> */}
          <label className={s.labelGender}>
            {t("userSettingsForm.gender")}
          </label>

          <div className={s.gender}>
            <label className={s.radioLabel}>
              <input
                {...register("gender")}
                type="radio"
                name="gender"
                value="woman"
                className={s.radioInput}
              />
              {/* Woman */}
              {t("userSettingsForm.woman")}
            </label>
            <label className={s.radioLabel}>
              <input
                {...register("gender")}
                type="radio"
                name="gender"
                value="man"
                className={s.radioInput}
              />
              {/* Man */}
              {t("userSettingsForm.man")}
            </label>
          </div>
          <div className={s.user}>
            <label className={s.labelInform}>
              {/* Your name */}
              {t("userSettingsForm.name")}
              <input
                {...register("name")}
                type="text"
                name="name"
                className={`${s.userInput} ${errors.name ? s.inputError : ""}`}
                onBlur={handleBlur}
                // placeholder="Name"
                placeholder={t("userSettingsForm.placeholderName")}
              />
              {errors.name && (
                <span className={s.error}>{errors.name.message}</span>
              )}
            </label>
            <label className={s.labelInform}>
              {/* Email */}
              {t("userSettingsForm.email")}
              <input
                {...register("email")}
                type="text"
                name="email"
                className={`${s.userInput} ${errors.email ? s.inputError : ""}`}
                onBlur={handleBlur}
                // placeholder="Email"
                placeholder={t("userSettingsForm.placeholderEmail")}
                disabled
              />
              {errors.email && (
                <span className={s.error}>{errors.email.message}</span>
              )}
            </label>
          </div>
          {/* <h3 className={s.labelNorma}>My daily norma</h3> */}
          <h3 className={s.labelNorma}>{t("userSettingsForm.dailyNorma")}</h3>

          <div className={s.formulaNorma}>
            <div className={s.normContainer}>
              {/* <p className={s.subTitle}>For woman:</p> */}
              <p className={s.subTitle}>{t("userSettingsForm.forWoman")}</p>

              <span className={s.formula}>
                {gender === "woman"
                  ? `You = (${newWeight} * 0.03) + (${newActiveTime} * 0.4) =  ${calculateWaterIntake(
                      "woman"
                    )} L`
                  : "V =  (M * 0.03) + (T * 0.4)"}
              </span>
            </div>
            <div className={s.normContainer}>
              {/* <p className={s.subTitle}>For man:</p> */}
              <p className={s.subTitle}>{t("userSettingsForm.forMan")}</p>

              <span className={s.formula}>
                {gender === "man"
                  ? `You = (${newWeight} * 0.04) + (${newActiveTime} * 0.6) =  ${calculateWaterIntake(
                      "man"
                    )} L`
                  : "V = (M * 0.04) + (T * 0.6)"}
              </span>
            </div>
          </div>
          <p className={s.normaInfo}>
            {/* <span className={s.p}>*</span> V is the volume of the water norm in
            liters per day, M is your body weight, T is the time of active
            sports, or another type of activity commensurate in terms of loads
            (in the absence of these, you must set 0) */}
            <span className={s.p}>*</span> {t("userSettingsForm.explanation")}
          </p>
          <p className={s.time}>
            <svg width="18" height="18">
              <use
                href={`${sprite}#icon-emojione-v1_white-exclamation-mark`}
              ></use>
            </svg>
            {/* Active time in hours */}
            {t("userSettingsForm.activeTime")}
          </p>
        </div>
        <div className={s.rightColumn}>
          <div className={s.infoContainer}>
            <label className={s.waterInfo}>
              {/* Your weight in kilograms: */}
              {t("userSettingsForm.weight")}
              <input
                {...register("weight")}
                type="number"
                name="weight"
                className={`${s.waterInput} ${
                  errors.weight ? s.inputError : ""
                }`}
                onBlur={handleBlur}
                placeholder="0"
              />
              {errors.weight && (
                <span className={s.error}>{errors.weight.message}</span>
              )}
            </label>
            <label className={s.waterInfo}>
              {/* The time of active participation in sports: */}
              {t("userSettingsForm.sportTime")}
              <input
                {...register("timeActive")}
                type="number"
                name="timeActive"
                className={`${s.waterInput} ${
                  errors.timeActive ? s.inputError : ""
                }`}
                onBlur={handleBlur}
                placeholder="0"
              />
              {errors.timeActive && (
                <span className={s.error}>{errors.timeActive.message}</span>
              )}
            </label>
          </div>
          <div className={s.required}>
            <h3 className={s.waterInfo}>
              {/* The required amount of water in liters per day: */}
              {t("userSettingsForm.waterRequired")}
            </h3>
            <div className={s.waterIntake}>
              {/* {newWeight || newActiveTime
                ? `${calculateWaterIntake(genderValue)} L`
                : '1.8 L'} */}
              {newWeight || newActiveTime
                ? `${calculateWaterIntake(genderValue)} ${t(
                    "userSettingsForm.litre"
                  )}`
                : `1.8 ${t("userSettingsForm.litre")}`}
            </div>
          </div>
          <label className={s.userIntake}>
            {/* Write down how much water you will drink: */}
            {t("userSettingsForm.drinkWater")}
            <input
              {...register("dailyNorma")}
              type="number"
              name="dailyNorma"
              step="0.1"
              className={`${s.intake} ${errors.dailyNorma ? s.inputError : ""}`}
              onBlur={handleBlur}
              placeholder="1.8"
            />
            {errors.dailyNorma && (
              <span className={s.error}>{errors.dailyNorma.message}</span>
            )}
          </label>
        </div>
      </div>
      <button className={s.save} type="submit" disabled={loader}>
        {/* Save{' '} */}

        {t("userSettingsForm.saveBtn")}
        {loader && (
          <span className={s.loaderBtn}>
            <Loader />
          </span>
        )}
      </button>
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
    </form>
  );
};

export default UserSettingsForm;
