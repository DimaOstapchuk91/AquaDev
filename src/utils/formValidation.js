import * as Yup from "yup";

//===========
import i18next from "i18next";

const lazyT = (key) => () => i18next.t(key);

const emailValid = Yup.string()
  // .email("Invalid email format")
  // .min(3, "Minimum 3 characters")
  // .max(50, "Maximum 50 characters")
  // // .required("Must be filled");
  // .required(lazyT("validation.email.required"));

  .email(() => i18next.t("validation.email.invalid")) // Dynamic translation
  .min(3, () => i18next.t("validation.email.min"))
  .max(50, () => i18next.t("validation.email.max"))
  .required(() => i18next.t("validation.email.required"));

// const passwordValid = Yup.string()
//   .min(3, "Minimum 3 characters")
//   .max(50, "Maximum 50 characters")
//   .matches(/[a-zA-Z]/, "Password must contain at least one letter")
//   .matches(/[0-9]/, "The password must contain at least one number")
//   .required(lazyT("validation.email.required"));

const passwordValid = Yup.string()
  .min(3, lazyT("validation.password.min"))
  .max(50, lazyT("validation.password.max"))
  .matches(/[a-zA-Z]/, lazyT("validation.password.letter"))
  .matches(/[0-9]/, lazyT("validation.password.number"))
  .required(lazyT("validation.password.required"));

const nameValid = Yup.string()
  // .min(3, "Minimum 3 characters")
  // .max(50, "Maximum 50 characters");
  .min(3, lazyT("validation.name.min"))
  .max(50, lazyT("validation.name.max"));

const activityTimeValid = Yup.number()
  // .typeError("Activity time must be a number")
  // .min(0, "Activity time must be 0 or greater");
  .typeError(lazyT("validation.activityTime.typeError"))
  .min(0, lazyT("validation.activityTime.min"));

const weightValid = Yup.number()
  // .min(0, "Weight must be greater than 0")
  // .typeError("Weight must be a number");
  .typeError(lazyT("validation.weight.typeError"))
  .min(0, lazyT("validation.weight.min"));

const waterIntakeValid = Yup.number()
  // .min(0, "Water intake must be 0 or greater")
  // .typeError("Water intake must be a number");
  .typeError(lazyT("validation.waterIntake.typeError"))
  .min(0, lazyT("validation.waterIntake.min"));

export const orderSchemaLogin = Yup.object({
  email: emailValid,
  password: passwordValid,
});

export const orderSchemaReg = Yup.object({
  email: emailValid,
  password: passwordValid,
  confirmPassword: Yup.string()
    // .oneOf([Yup.ref("password"), null], "Passwords must match")
    // .required("Password confirmation is required"),
    .oneOf([Yup.ref("password"), null], lazyT("validation.password.match"))
    .required(lazyT("validation.password.confirmRequired")),
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

export const validationSchemaWaterChange = Yup.object().shape({
  amount: Yup.number()
    //   .required("Amount is required")
    //   .positive("Amount must be greater than 0")
    //   .integer("Amount must be an integer")
    //   .min(1, "Amount must be at least 1 ml")
    //   .max(10000, "Amount cannot exceed 10,000 ml"),
    // time: Yup.string()
    //   .required("Time is required")
    //   .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (hh:mm)"),
    .required(lazyT("validation.amount.required"))
    .positive(lazyT("validation.amount.positive"))
    .integer(lazyT("validation.amount.integer"))
    .min(1, lazyT("validation.amount.min"))
    .max(10000, lazyT("validation.amount.max")),
  time: Yup.string()
    .required(lazyT("validation.time.required"))
    .matches(
      /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
      lazyT("validation.time.format")
    ),
});
