import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSettingsSchema } from "../../../utils/formValidation.js";
import s from "./UserSettingsForm.module.css";

const UserSettingsForm = ({ userName = "", onClose, updateUserData }) => {
  const [avatar, setAvatar] = useState(null);
  const [waterIntake, setWaterIntake] = useState(0);
  const [error, setError] = useState(null);

  const userEmail = useSelector((state) => state.user.email);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSettingsSchema),
    defaultValues: {
      gender: "woman",
      name: userName,
      email: userEmail || "",
      weight: localStorage.getItem("userWeight") || "",
      activeTime: localStorage.getItem("activeTime") || "",
      customWaterIntake: localStorage.getItem("customWaterIntake") || "",
    },
  });

  const weight = watch("weight");
  const activeTime = watch("activeTime");

  const calculateWaterIntake = (M, T, gender = "woman") => {
    if (gender === "woman") {
      return M * 0.03 + T * 0.4;
    } else {
      return M * 0.04 + T * 0.6;
    }
  };

  useEffect(() => {
    if (weight && activeTime) {
      setWaterIntake(calculateWaterIntake(Number(weight), Number(activeTime)));
    } else {
      setWaterIntake(0);
    }
  }, [weight, activeTime]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    if (Object.keys(errors).length > 0) {
      return;
    }

    const formData = new FormData();
    formData.append("avatar", avatar);
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    localStorage.setItem("userWeight", data.weight);
    localStorage.setItem("activeTime", data.activeTime);
    localStorage.setItem("customWaterIntake", data.customWaterIntake);

    try {
      const response = await fetch("/api/user/settings", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "An error occurred");
      } else {
        onClose();
        updateUserData();
      }
    } catch {
      setError("Network error occurred");
    }
  };

  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : "U");

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={s.btnContainer}>
        <button className={s.closeBtn} onClick={onClose} type="button">
          <svg className={s.close}>
            <use href="/src/assets/sprite.svg#icon-x-1"></use>
          </svg>
        </button>
      </div>
      <h2 className={s.title}>Setting</h2>
      <div className={s.avatarContainer}>
        {avatar ? (
          <img src={avatar} alt="Avatar Preview" className={s.avatar} />
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
            <use href="/src/assets/sprite.svg#icon-upload"></use>
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
                defaultChecked
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
                className={s.userInput}
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
                className={s.userInput}
                placeholder="Email"
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
                {weight && activeTime
                  ? `${waterIntake.toFixed(
                      2
                    )} = (${weight} * 0.03) + (${activeTime} * 0.4)`
                  : "V =  (M * 0.03) + (T * 0.4)"}
              </span>
            </div>
            <div className={s.normContainer}>
              <p className={s.subTitle}>For man:</p>
              <span className={s.formula}>
                {weight && activeTime
                  ? `${waterIntake.toFixed(
                      2
                    )} = (${weight} * 0.04) + (${activeTime} * 0.6)`
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
              <use href="/src/assets/sprite.svg#icon-emojione-v1_white-exclamation-mark"></use>
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
                className={s.waterInput}
                placeholder="0"
              />
              {errors.weight && (
                <span className={s.error}>{errors.weight.message}</span>
              )}
            </label>
            <label className={s.waterInfo}>
              The time of active participation in sports:
              <input
                {...register("activeTime")}
                type="number"
                className={s.waterInput}
                placeholder="0"
              />
              {errors.activeTime && (
                <span className={s.error}>{errors.activeTime.message}</span>
              )}
            </label>
          </div>
          <div className={s.required}>
            <h3 className={s.waterInfo}>
              The required amount of water in liters per day:
            </h3>
            <div className={s.waterIntake}>
              {watch("customWaterIntake")
                ? `${watch("customWaterIntake")} L`
                : weight && activeTime
                ? `${waterIntake.toFixed(2)} L`
                : "1.8 L"}
            </div>
          </div>
          <label className={s.userIntake}>
            Write down how much water you will drink:
            <input
              {...register("customWaterIntake")}
              type="number"
              className={s.intake}
              placeholder="1.8"
            />
          </label>
        </div>
      </div>
      <button className={s.save} type="submit">
        Save
      </button>
      {error && <div className={s.errorNotification}>{error}</div>}
    </form>
  );
};

export default UserSettingsForm;
