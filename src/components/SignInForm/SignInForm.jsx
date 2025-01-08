import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import styles from "./signInForm.module.css";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations.js";

import { orderSchemaLogin } from "../../utils/formValidation.js";

const SignInForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const initForm = {
    email: "",
    password: "",
  };

  const dispatch = useDispatch();

  const handleSubmit = (values, options) => {
    dispatch(logIn(values));
    console.log(values);
    options.resetForm();
  };

  return (
    <div className={styles.containerWapper}>
      <div className={styles.leftSection}>
        <h1 className={styles.brand}>AQUATRACK</h1>
        <div className={styles.card}>
          <h2 className={styles.title}>Sign In</h2>
          <Formik
            initialValues={initForm}
            validationSchema={orderSchemaLogin}
            onSubmit={handleSubmit}
          >
            <Form className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  id="email"
                  className={`${styles.input} ${
                    initForm.email ? styles.error : styles.success
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
              <button type="submit" className={styles.submitButton}>
                Sign In
              </button>
            </Form>
          </Formik>

          <p className={styles.footerText}>
            Don't have an account?{" "}
            <NavLink to="/signup" className={styles.signupLink}>
              Sign Up
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
};

export default SignInForm;
