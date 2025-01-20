import { useState } from "react";
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

const UserSettingsForm = ({ onClose }) => {
  const { name, email, gender, weight, timeActive, dailyNorma, avatar } =
    useSelector(selectUser);
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
      dailyNorma: dailyNorma / 1000,
    },
    shouldUnregister: true,
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

    const updatedDailyNorma = calculateWaterIntake(genderValue);
    formData.append("dailyNorma", updatedDailyNorma * 1000);

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
          <span className={s.uploadBtn}>Upload a photo</span>
        </div>
      </label>
      <div className={s.mainContainer}>
        <div className={s.leftColumn}>
          <label className={s.labelGender}>Your gender identity</label>
          <div className={s.gender}>
            <label className={s.radioLabel}>
              <input
                {...register("gender")}
                type="radio"
                name="gender"
                value="woman"
                className={s.radioInput}
              />
              Woman
            </label>
            <label className={s.radioLabel}>
              <input
                {...register("gender")}
                type="radio"
                name="gender"
                value="man"
                className={s.radioInput}
              />
              Man
            </label>
          </div>
          <div className={s.user}>
            <label className={s.labelInform}>
              Your name
              <input
                {...register("name")}
                type="text"
                name="name"
                className={`${s.userInput} ${errors.name ? s.inputError : ""}`}
                onBlur={handleBlur}
                placeholder="Name"
              />
              {errors.name && (
                <span className={s.error}>{errors.name.message}</span>
              )}
            </label>
            <label className={s.labelInform}>
              Email
              <input
                {...register("email")}
                type="text"
                name="email"
                className={`${s.userInput} ${errors.email ? s.inputError : ""}`}
                onBlur={handleBlur}
                placeholder="Email"
                disabled
              />
              {errors.email && (
                <span className={s.error}>{errors.email.message}</span>
              )}
            </label>
          </div>
          <h3 className={s.labelNorma}>My daily norma</h3>
          <div className={s.formulaNorma}>
            <div className={s.normContainer}>
              <p className={s.subTitle}>For woman:</p>
              <span className={s.formula}>
                {gender === "woman"
                  ? `${calculateWaterIntake(
                      "woman"
                    )} L = (${newWeight} * 0.03) + (${newActiveTime} * 0.4)`
                  : "V =  (M * 0.03) + (T * 0.4)"}
              </span>
            </div>
            <div className={s.normContainer}>
              <p className={s.subTitle}>For man:</p>
              <span className={s.formula}>
                {gender === "man"
                  ? `${calculateWaterIntake(
                      "man"
                    )} L = (${newWeight} * 0.04) + (${newActiveTime} * 0.6)`
                  : "V = (M * 0.04) + (T * 0.6)"}
              </span>
            </div>
          </div>
          <p className={s.normaInfo}>
            <span className={s.p}>*</span> V is the volume of the water norm in
            liters per day, M is your body weight, T is the time of active
            sports, or another type of activity commensurate in terms of loads
            (in the absence of these, you must set 0)
          </p>
          <p className={s.time}>
            <svg width="18" height="18">
              <use
                href={`${sprite}#icon-emojione-v1_white-exclamation-mark`}
              ></use>
            </svg>
            Active time in hours
          </p>
        </div>
        <div className={s.rightColumn}>
          <div className={s.infoContainer}>
            <label className={s.waterInfo}>
              Your weight in kilograms:
              <input
                {...register("weight")}
                type="number"
                name="weight"
                className={`${s.waterInput} ${
                  errors.weight ? s.inputError : ""
                }`}
                placeholder="0"
                onInput={(e) => {
                  if (e.target.value > 200) {
                    e.target.value = 200;
                  }
                }}
              />
              {errors.weight && (
                <span className={s.error}>{errors.weight.message}</span>
              )}
            </label>
            <label className={s.waterInfo}>
              The time of active participation in sports:
              <input
                {...register("timeActive")}
                type="number"
                name="timeActive"
                className={`${s.waterInput} ${
                  errors.timeActive ? s.inputError : ""
                }`}
                onBlur={handleBlur}
                placeholder="0"
                onInput={(e) => {
                  if (e.target.value > 12) {
                    e.target.value = 12;
                  }
                }}
              />
              {errors.timeActive && (
                <span className={s.error}>{errors.timeActive.message}</span>
              )}
            </label>
          </div>
          <div className={s.required}>
            <h3 className={s.waterInfo}>
              The required amount of water in liters per day:
            </h3>
            <div className={s.waterIntake}>
              {newWeight || newActiveTime
                ? `${calculateWaterIntake(genderValue)} L`
                : "0 L"}
            </div>
          </div>
          <label className={s.userIntake}>
            Write down how much water you will drink:
            <input
              {...register("dailyNorma")}
              type="number"
              name="dailyNorma"
              step="0.1"
              className={`${s.intake} ${errors.dailyNorma ? s.inputError : ""}`}
              onBlur={handleBlur}
            />
            {errors.dailyNorma && (
              <span className={s.error}>{errors.dailyNorma.message}</span>
            )}
          </label>
        </div>
      </div>
      <button className={s.save} type="submit" disabled={loader}>
        Save{" "}
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
