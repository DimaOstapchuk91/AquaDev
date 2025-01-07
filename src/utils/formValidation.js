import * as Yup from 'yup';

const emailValid = Yup.string()
  .email('Invalid email format')
  .min(3, 'Minimum 3 characters')
  .max(50, 'Maximum 50 characters')
  .required('Must be filled');

const passwordValid = Yup.string()
  .min(3, 'Minimum 3 characters')
  .max(50, 'Maximum 50 characters')
  .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
  .matches(/[0-9]/, 'The password must contain at least one number')
  .required('Password is required');

const nameValid = Yup.string()
  .min(3, 'Minimum 3 characters')
  .max(50, 'Maximum 50 characters')
  .required('Name is required');

export const orderSchemaLogin = Yup.object({
  email: emailValid,
  password: passwordValid,
});

export const orderSchemaReg = Yup.object({
  email: emailValid,
  password: passwordValid,
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation is required'),
});
