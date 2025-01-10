import * as Yup from "yup";

const emailValid = Yup.string()
  .email("Invalid email format")
  .min(3, "Minimum 3 characters")
  .max(50, "Maximum 50 characters")
  .required("Must be filled");

const passwordValid = Yup.string()
  .min(3, "Minimum 3 characters")
  .max(50, "Maximum 50 characters")
  .matches(/[a-zA-Z]/, "Password must contain at least one letter")
  .matches(/[0-9]/, "The password must contain at least one number")
  .required("Password is required");

const nameValid = Yup.string()
  .min(3, "Minimum 3 characters")
  .max(50, "Maximum 50 characters");

const activityTimeValid = Yup.number()
  .typeError("Activity time must be a number")
  .min(0, "Activity time must be 0 or greater");

const weightValid = Yup.number()
  .min(0, "Weight must be greater than 0")
  .typeError("Weight must be a number");

const waterIntakeValid = Yup.number()
  .min(0, "Water intake must be 0 or greater")
  .typeError("Water intake must be a number");

export const orderSchemaLogin = Yup.object({
  email: emailValid,
  password: passwordValid,
});

export const orderSchemaReg = Yup.object({
  email: emailValid,
  password: passwordValid,
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Password confirmation is required"),
});

export const userSettingsSchema = Yup.object().shape({
  avatar: Yup.mixed().default((obj) =>
    obj.name ? obj.name.charAt(0).toUpperCase() : ""
  ),
  gender: Yup.string().default("female"),
  name: nameValid.default(""),
  email: emailValid.default(""),
  weight: weightValid.default(0),
  activityTime: activityTimeValid.default(0),
  waterIntake: waterIntakeValid.default(0),
});
