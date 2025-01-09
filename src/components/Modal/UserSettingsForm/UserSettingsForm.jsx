import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import s from "./UserSettingsForm.module.css";

const validationSchema = Yup.object().shape({
  avatar: Yup.mixed().required("Avatar is required"),
  gender: Yup.string().required("Gender is required"),
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  weight: Yup.number()
    .typeError("Weight must be a number")
    .min(1, "Weight must be greater than 0")
    .required("Weight is required"),
  activityTime: Yup.number()
    .typeError("Activity time must be a number")
    .min(0, "Activity time must be 0 or greater")
    .required("Activity time is required"),
  waterIntake: Yup.number()
    .typeError("Water intake must be a number")
    .min(0, "Water intake must be 0 or greater")
    .required("Water intake is required"),
});

const UserSettingsForm = ({ onClose, onUpdate }) => {
  const [previewAvatar, setPreviewAvatar] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      avatar: null,
      gender: "",
      name: "",
      email: "",
      weight: "",
      activityTime: "",
      waterIntake: "",
    },
  });

  const calculateWaterNorm = (weight, activityTime) => {
    return (weight * 0.033 + activityTime * 0.12).toFixed(2);
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await fetch("/api/update-user", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to update user data");
      }

      onUpdate();
      onClose();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setValue("avatar", file);
      setPreviewAvatar(URL.createObjectURL(file));
    }
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      {errorMessage && <div className={s.error}>{errorMessage}</div>}

      <div className={s.field}>
        <label>Avatar</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {previewAvatar && (
          <img src={previewAvatar} alt="Preview" className={s.avatarPreview} />
        )}
        {errors.avatar && (
          <p className={s.errorText}>{errors.avatar.message}</p>
        )}
      </div>

      <div className={s.field}>
        <label>Gender</label>
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <div>
              <label>
                <input type="radio" value="male" {...field} />
                Male
              </label>
              <label>
                <input type="radio" value="female" {...field} />
                Female
              </label>
            </div>
          )}
        />
        {errors.gender && (
          <p className={s.errorText}>{errors.gender.message}</p>
        )}
      </div>

      <div className={s.field}>
        <label>Name</label>
        <input {...register("name")} />
        {errors.name && <p className={s.errorText}>{errors.name.message}</p>}
      </div>

      <div className={s.field}>
        <label>Email</label>
        <input type="email" {...register("email")} />
        {errors.email && <p className={s.errorText}>{errors.email.message}</p>}
      </div>

      <div className={s.field}>
        <label>Weight (kg)</label>
        <input type="number" {...register("weight")} />
        {errors.weight && (
          <p className={s.errorText}>{errors.weight.message}</p>
        )}
      </div>

      <div className={s.field}>
        <label>Activity Time (hours/day)</label>
        <input type="number" {...register("activityTime")} />
        {errors.activityTime && (
          <p className={s.errorText}>{errors.activityTime.message}</p>
        )}
      </div>

      <div className={s.field}>
        <label>Water Intake (liters/day)</label>
        <input type="number" {...register("waterIntake")} />
        {errors.waterIntake && (
          <p className={s.errorText}>{errors.waterIntake.message}</p>
        )}
      </div>

      <div className={s.waterInfo}>
        <p>
          Recommended Water Intake:{" "}
          {calculateWaterNorm(
            Number(watch("weight")),
            Number(watch("activityTime"))
          )}{" "}
          liters/day
        </p>
      </div>

      <button type="submit" className={s.submitButton}>
        Save
      </button>
    </form>
  );
};

export default UserSettingsForm;
