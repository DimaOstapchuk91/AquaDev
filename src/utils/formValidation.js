import * as Yup from "yup";
import i18next from "i18next";

const lazyT = (key) => () => i18next.t(key);

const emailValid = Yup.string()
  // .email("Invalid email format")
  // .min(3, "Minimum 3 characters")
  // .max(50, "Maximum 50 characters")
  // // .required("Must be filled");
  // .required(lazyT("validation.email.required"));

  .email(() => i18next.t("validation.email.invalid"))
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
  // .min(3, "Minimum 3 characters")
  // .max(50, "Maximum 50 characters")
  // .matches(/[a-zA-Z]/, "Password must contain at least one letter")
  // .matches(/[0-9]/, "The password must contain at least one number")
  // .required("Password is required");
  .min(3, lazyT("validation.password.min"))
  .max(50, lazyT("validation.password.max"))
  .matches(/[a-zA-Z]/, lazyT("validation.password.letter"))
  .matches(/[0-9]/, lazyT("validation.password.number"))
  .required(lazyT("validation.password.required"));

const nameValid = Yup.string()
  // .min(2, "Minimum 2 characters")
  // .max(16, "Maximum 16 characters");
  .min(2, lazyT("validation.name.min"))
  .max(16, lazyT("validation.name.max"));

const activityTimeValid = Yup.number()
  // .typeError('Activity time must be a number')
  // .min(0, 'Activity time must be 0 or greater')
  // .max(12, 'The time of action should be no more than 12');
  .typeError(lazyT("validation.activityTime.typeError"))
  .min(0, lazyT("validation.activityTime.min"))
  .max(12, lazyT("validation.activityTime.max"));

const weightValid = Yup.number()
  // .min(0, 'Weight must be greater than 0')
  // .max(200, 'The weight must be less than 200')
  // .typeError('Weight must be a number');
  .typeError(lazyT("validation.weight.typeError"))
  .min(0, lazyT("validation.weight.min"))
  .max(200, lazyT("validation.weight.max"));

const waterIntakeValid = Yup.number()
  // .min(0.5, 'Water intake must be at least 0.5 liters (500 ml)')
  // .max(15, 'Water intake cannot exceed 15 liters (15,000 ml)')
  // .typeError('Water intake must be a number')
  // .test(
  //   'one-decimal-place',
  //   'Water intake must have at most one decimal place',
  .min(0.5, lazyT("validation.waterIntake.min"))
  .max(15, lazyT("validation.waterIntake.max"))
  .typeError(lazyT("validation.waterIntake.typeError"))
  .test("one-decimal-place", lazyT("validation.waterIntake.test"), (value) => {
    if (value === undefined || value === null) return true;
    return /^\d+(\.\d{1})?$/.test(String(value));
  });

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
  gender: Yup.string(),
  name: nameValid,
  email: emailValid,
  weight: weightValid,
  timeActive: activityTimeValid,
  dailyNorma: waterIntakeValid,
});

export const validationSchemaWaterChange = Yup.object().shape({
  amount: Yup.number()
    // .required('Amount is required')
    // .positive('Amount must be greater than 0')
    // .integer('Amount must be an integer')
    // .min(50, 'Amount must be at least 50 ml')
    // .max(2000, 'Amount cannot exceed 2000 ml'),
    .required(lazyT("validation.amount.required"))
    .positive(lazyT("validation.amount.positive"))
    .integer(lazyT("validation.amount.integer"))
    .min(50, lazyT("validation.amount.min"))
    .max(2000, lazyT("validation.amount.max")),
  time: Yup.string()
    // .required("Time is required")
    // .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (hh:mm)"),
    .required(lazyT("validation.time.required"))
    .matches(
      /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
      lazyT("validation.time.format")
    ),
});
