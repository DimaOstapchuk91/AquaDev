import { useState } from "react";
import styles from "./signInForm.module.css";
import { NavLink } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
// import orderSchemaLogin from "../../utils/formValidation.js";

const SignInForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const initForm = {
    email: "",
    password: "",
  };

  const handleSubmit = (values, options) => {
    console.log(values);
    console.log(options);
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
  });

  return (
    <div>
      <h1 className={styles.brand}>AQUATRACK</h1>
      <div className={styles.card}>
        <h2 className={styles.title}>Sign In</h2>
        <Formik
          initialValues={initForm}
          validationSchema={validationSchema}
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
                className={styles.input}
                placeholder="Enter your email"
                required
              />
              <ErrorMessage
                className={styles.errorMessage}
                name="email"
                component="p"
              >
                Some error email
              </ErrorMessage>
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
                  className={`${styles.input} ${styles.error}`}
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
              >
                Some error password
              </ErrorMessage>
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
  );
};

export default SignInForm;
