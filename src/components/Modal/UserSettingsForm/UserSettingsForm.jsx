import { useState, useEffect } from "react";
import s from "./UserSettingsForm.module.css";
import { useTranslation } from "react-i18next";

const UserSettingsForm = ({ userName = "User", onClose }) => {
  //==============
  const { t } = useTranslation();
  //=================
  const [avatar, setAvatar] = useState(null);
  const [M, setM] = useState(localStorage.getItem("userWeight") || "");
  const [T, setT] = useState(localStorage.getItem("activeTime") || "");
  const [waterIntake, setWaterIntake] = useState(0);
  const [customWaterIntake, setCustomWaterIntake] = useState(
    localStorage.getItem("customWaterIntake") || ""
  );

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : "U");

  useEffect(() => {
    setWaterIntake(M && T ? calculateWaterIntake(Number(M), Number(T)) : 0);
  }, [M, T]);

  const calculateWaterIntake = (M, T, gender = "female") => {
    if (gender === "female") {
      return M * 0.03 + T * 0.4;
    } else {
      return M * 0.04 + T * 0.6;
    }
  };

  const handleMChange = (e) => {
    const value = e.target.value;
    setM(value === "" ? "" : Number(value));
    setWaterIntake(
      value === "" ? 0 : calculateWaterIntake(Number(value), Number(T))
    );
  };

  const handleTChange = (e) => {
    const value = e.target.value;
    setT(value === "" ? "" : Number(value));
    setWaterIntake(
      value === "" ? 0 : calculateWaterIntake(Number(M), Number(value))
    );
  };

  const handleCustomWaterChange = (e) => {
    setCustomWaterIntake(e.target.value);
  };

  return (
    <form className={s.form}>
      <div className={s.btnContainer}>
        <button className={s.closeBtn} onClick={onClose}>
          <svg className={s.close}>
            <use href="/src/assets/sprite.svg#icon-x-1"></use>
          </svg>
        </button>
      </div>
      {/* <h2 className={s.title}>Setting</h2> */}
      <h2 className={s.title}>{t("userSettingsForm.settings")}</h2>

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
                type="radio"
                name="gender"
                value="woman"
                defaultChecked
                className={s.radioInput}
              />
              {/* Woman */}
              {t("userSettingsForm.woman")}
            </label>
            <label className={s.radioLabel}>
              <input
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
              <input type="text" className={s.userInput} placeholder="Name" />
            </label>
            <label className={s.labelInform}>
              {/* Email */}
              {t("userSettingsForm.email")}
              <input type="text" className={s.userInput} />
            </label>
          </div>
          {/* <h3 className={s.labelNorma}>My daily norma</h3> */}
          <h3 className={s.labelNorma}>{t("userSettingsForm.dailyNorma")}</h3>

          <div className={s.formulaNorma}>
            <div className={s.normContainer}>
              {/* <p className={s.subTitle}>For woman:</p> */}
              <p className={s.subTitle}>{t("userSettingsForm.forWoman")}</p>

              <span className={s.formula}>
                {M && T
                  ? `${waterIntake.toFixed(2)}  = (${M} * 0.03) + (${T} * 0.4)`
                  : "V =  (M * 0.03) + (T * 0.4)"}
              </span>
            </div>
            <div className={s.normContainer}>
              {/* <p className={s.subTitle}>For man:</p> */}
              <p className={s.subTitle}>{t("userSettingsForm.forMan")}</p>

              <span className={s.formula}>
                {M && T
                  ? `${waterIntake.toFixed(2)} = (${M} * 0.04) + (${T} * 0.6)`
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
              <use href="/src/assets/sprite.svg#icon-emojione-v1_white-exclamation-mark"></use>
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
                className={s.waterInput}
                type="number"
                value={M}
                onChange={handleMChange}
                placeholder="0"
              />
            </label>
            <label className={s.waterInfo}>
              {/* The time of active participation in sports: */}
              {t("userSettingsForm.sportTime")}
              <input
                className={s.waterInput}
                type="number"
                value={T}
                onChange={handleTChange}
                placeholder="0"
              />
            </label>
          </div>
          <div className={s.required}>
            <h3 className={s.waterInfo}>
              {/* The required amount of water in liters per day: */}
              {t("userSettingsForm.waterRequired")}
            </h3>
            <div className={s.waterIntake}>
              {customWaterIntake
                ? `${customWaterIntake} L`
                : M && T
                ? `${waterIntake.toFixed(2)} L`
                : "1.8 L"}
            </div>
          </div>
          <label className={s.userIntake}>
            {/* Write down how much water you will drink: */}
            {t("userSettingsForm.drinkWater")}
            <input
              type="number"
              className={s.intake}
              value={customWaterIntake}
              onChange={handleCustomWaterChange}
              placeholder="1,8"
            />
          </label>
        </div>
      </div>

      <button className={s.save} type="submit">
        {/* Save */}
        {t("userSettingsForm.saveBtn")}
      </button>
    </form>
  );
};

export default UserSettingsForm;
