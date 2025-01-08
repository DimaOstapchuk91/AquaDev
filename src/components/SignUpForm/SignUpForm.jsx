import { useState } from "react";
import { useDispatch } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { NavLink } from "react-router-dom";
import styles from "./signUpForm.module.css";
import { orderSchemaReg } from "../../utils/formValidation.js";

import { register } from "../../redux/auth/operations.js";

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

  const dispatch = useDispatch();

  const handleSubmit = (values, options) => {
    dispatch(register(values));
    options.resetForm();
  };

  return (
    <div className={styles.containerWapper}>
      <div className={styles.leftSection}>
        <h1 className={styles.brand}>AQUATRACK</h1>
        <div className={styles.card}>
          <h2 className={styles.title}>Sign Up</h2>
          <Formik
            initialValues={initForm}
            validationSchema={orderSchemaReg}
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
                <label htmlFor="RegisterPassword" className={styles.label}>
                  Password
                </label>
                <div className={styles.passwordWrapper}>
                  <Field
                    name="password"
                    type={passwordVisible ? "text" : "password"}
                    id="RegisterPassword"
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
                <label htmlFor="repeatPassword" className={styles.label}>
                  Repeat password
                </label>
                <div className={styles.passwordWrapper}>
                  <Field
                    name="confirmPassword"
                    type={repeatPasswordVisible ? "text" : "password"}
                    id="repeatPassword"
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
      <div className={styles.rightSection}>
        <img
          src="https://via.placeholder.com/400x600"
          alt="Person drinking water"
          className={styles.image}
        />
        <div className={styles.overlay}>
          <div className={styles.customerInfo}>
            <span className={styles.customers}>Our happy customers</span>
            <div className={styles.avatarGroup}>
              {/* Додайте аватари тут */}
            </div>
          </div>
          <button className={styles.infoButton}>Habit drive</button>
          <button className={styles.infoButton}>View statistics</button>
          <button className={styles.infoButton}>Personal rate setting</button>
        </div>
      </div>
    </div>
  );
}
