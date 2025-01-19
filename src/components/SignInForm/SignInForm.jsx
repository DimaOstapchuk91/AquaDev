import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import styles from "./signInForm.module.css";
import { logIn } from "../../redux/user/operations.js";
import { useDispatch } from "react-redux";
import { orderSchemaLogin } from "../../utils/formValidation.js";
import { selectIsRefreshing } from "../../redux/user/selectors.js";
import Loader from "../Loader/Loader.jsx";

//=======================================
import { useTranslation } from "react-i18next";
//==============================
const SignInForm = () => {
  const { t } = useTranslation();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const initForm = {
    email: "",
    password: "",
  };

  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsRefreshing);

  const handleSubmit = (values) => {
    dispatch(logIn(values));
  };

  return (
    <div className={styles.leftSection}>
      <h1 className={styles.brand}>AQUATRACK</h1>
      <div className={styles.card}>
        {/* <h2 className={styles.title}>Sign In</h2> */}
        <h2 className={styles.title}>{t("signIn.signIn")}</h2>
        <Formik
          initialValues={initForm}
          validationSchema={orderSchemaLogin}
          onSubmit={handleSubmit}
        >
          <Form className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                {/* Email */}
                {t("signIn.email")}
              </label>
              <Field
                name="email"
                type="email"
                id="email"
                className={`${styles.input} ${
                  initForm.email ? styles.error : styles.success
                }`}
                // placeholder="Enter your email"
                placeholder={t("signIn.enterEmail")}
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
                {/* Password */}
                {t("signIn.password")}
              </label>
              <div className={styles.passwordWrapper}>
                <Field
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  className={`${styles.input} ${
                    initForm.password ? styles.error : styles.success
                  }`}
                  // placeholder="Enter your password"
                  placeholder={t("signIn.enterPassword")}
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
            {isLoading ? (
              <div className={styles.wrapperLoader}>
                <Loader />
              </div>
            ) : (
              <button type="submit" className={styles.submitButton}>
                {/* Sign In */}
                {t("signIn.signIn")}
              </button>
            )}
          </Form>
        </Formik>
        {!isLoading && (
          <p className={styles.footerText}>
            {/* Don't have an account? */}
            {t("signIn.noAccount")}{" "}
            <NavLink to="/signup" className={styles.signupLink}>
              {/* Sign Up */}
              {t("signIn.signUp")}
            </NavLink>
          </p>
        )}
      </div>
    </div>
  );
};

export default SignInForm;
