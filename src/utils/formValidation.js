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
  .min(0.5, "Water intake must be at least 0.5 liters (500 ml)")
  .max(15, "Water intake cannot exceed 15 liters (15,000 ml)")
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
  timeActive: activityTimeValid.default(0),
  dailyNorma: waterIntakeValid.default(2),
});

export const validationSchemaWaterChange = Yup.object().shape({
  amount: Yup.number()
    .required("Amount is required")
    .positive("Amount must be greater than 0")
    .integer("Amount must be an integer")
    .min(50, "Amount must be at least 50 ml")
    .max(2000, "Amount cannot exceed 2000 ml"),
  time: Yup.string()
    .required("Time is required")
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (hh:mm)"),
});
