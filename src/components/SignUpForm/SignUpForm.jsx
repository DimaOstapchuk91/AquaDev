import { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { NavLink } from "react-router-dom";
import styles from "./signUpForm.module.css";
import * as Yup from "yup";
// import orderSchemaReg from "../../utils/formValidation.js";

export default function SignUpForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [repeatPasswordVisible, setRepeatPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const toggleRepeatPasswordVisibility = () => {
    setRepeatPasswordVisible(!repeatPasswordVisible);
  };

  const initForm = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = (values, options) => {
    // dispatch(register(values));
    console.log(values);
    options.resetForm();
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    password: Yup.string()
      .min(8, "Password must contain at least 8 characters")
      .matches(
        /[a-z]/,
        "The password must contain at least 1 letter in lowercase"
      )
      .matches(
        /[A-Z]/,
        "The password must contain at leats 1 letter in uppercase"
      )
      .matches(/\d/, "The password must contain at least 1 number")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .min(8, "Password must contain at least 8 characters")
      .matches(
        /[a-z]/,
        "The password must contain at least 1 letter in lowercase"
      )
      .matches(
        /[A-Z]/,
        "The password must contain at leats 1 letter in uppercase"
      )
      .matches(/\d/, "The password must contain at least 1 number")
      .required("Password is required"),
  });

  return (
    <div>
      <h1 className={styles.brand}>AQUATRACK</h1>
      <div className={styles.card}>
        <h2 className={styles.title}>Sign Up</h2>
        <Formik
          initialValues={initForm}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form action="#" className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <Field
                name="email"
                type="email"
                id="email"
                className={`${styles.input} ${
                  initForm.name ? styles.error : styles.success
                }`}
                placeholder="Enter your email"
                required
              />
              <ErrorMessage
                className={styles.errorMessage}
                name="email"
                component="p"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <div className={styles.passwordWrapper}>
                <Field
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  className={`${styles.input} ${
                    initForm.password ? styles.error : styles.success
                  }`}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className={styles.togglePassword}
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? "🙈" : "👁️"}
                </button>
              </div>
              <ErrorMessage
                className={styles.errorMessage}
                name="password"
                component="p"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="RepeatPassword" className={styles.label}>
                Repeat password
              </label>
              <div className={styles.passwordWrapper}>
                <Field
                  name="confirmPassword"
                  type={repeatPasswordVisible ? "text" : "password"}
                  id="RepeatPassword"
                  className={`${styles.input} ${
                    initForm.confirmPassword ? styles.error : styles.success
                  }`}
                  placeholder="Repeat password"
                  required
                />
                <button
                  type="button"
                  className={styles.togglePassword}
                  onClick={toggleRepeatPasswordVisibility}
                >
                  {repeatPasswordVisible ? "🙈" : "👁️"}
                </button>
              </div>
              <ErrorMessage
                className={styles.errorMessage}
                name="confirmPassword"
                component="p"
              />
            </div>
            <button type="submit" className={styles.submitButton}>
              Sign Up
            </button>
          </Form>
        </Formik>

        <p className={styles.footerText}>
          Don't have an account?{" "}
          <NavLink to="/signin" className={styles.signupLink}>
            Sign In
          </NavLink>
        </p>
      </div>
    </div>
  );
}
