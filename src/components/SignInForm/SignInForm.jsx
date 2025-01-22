import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import styles from "./signInForm.module.css";
import { googleLoginUrl, logIn } from "../../redux/user/operations.js";
import { useDispatch } from "react-redux";
import { orderSchemaLogin } from "../../utils/formValidation.js";
import { selectIsRefreshing } from "../../redux/user/selectors.js";
import Loader from "../Loader/Loader.jsx";
import sprite from "../../assets/sprite.svg";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import LocalizationDropdown from "../LocalizationDropdown/LocalizationDropdown.jsx";

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

  const handleGoogleLogin = async () => {
    const result = await dispatch(googleLoginUrl());
    if (googleLoginUrl.fulfilled.match(result)) {
      window.location.href = result.payload;
    } else {
      console.error("Error:", result.payload);
    }
  };

  return (
    <div className={styles.leftSection}>
      <div className={styles.parentTwoVisible}>
        <LocalizationDropdown />
      </div>
      <h1 className={styles.brand}>AQUATRACK</h1>
      <div className={styles.card}>
        <h2 className={styles.title}>{t("signIn.signIn")}</h2>
        <Formik
          key={i18next.language}
          initialValues={initForm}
          validationSchema={orderSchemaLogin}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>
                  {t("signIn.email")}
                </label>
                <Field
                  name="email"
                  type="email"
                  id="email"
                  className={`${styles.input} ${
                    touched.email
                      ? errors.email
                        ? styles.error
                        : styles.success
                      : ""
                  }`}
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
                  {t("signIn.password")}
                </label>
                <div className={styles.passwordWrapper}>
                  <Field
                    name="password"
                    type={passwordVisible ? "text" : "password"}
                    id="password"
                    className={`${styles.input} ${
                      touched.password
                        ? errors.password
                          ? styles.error
                          : styles.success
                        : ""
                    }`}
                    placeholder={t("signIn.enterPassword")}
                    required
                  />
                  <button
                    type="button"
                    className={styles.togglePassword}
                    onClick={togglePasswordVisibility}
                  >
                    {passwordVisible ? (
                      <svg
                        width="15"
                        height="15"
                        className={`${styles.eye} ${
                          touched.password
                            ? errors.password
                              ? styles.error
                              : styles.success
                            : ""
                        }`}
                      >
                        <use href={`${sprite}#icon-eye`}></use>
                      </svg>
                    ) : (
                      <svg
                        width="15"
                        height="15"
                        className={`${styles.eye} ${
                          touched.password
                            ? errors.password
                              ? styles.error
                              : styles.success
                            : ""
                        }`}
                      >
                        <use href={`${sprite}#icon-eye-off`}></use>
                      </svg>
                    )}
                  </button>
                </div>
                <ErrorMessage
                  className={styles.errorMessage}
                  name="password"
                  component="p"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={styles.submitButton}
              >
                {t("signIn.signIn")}{" "}
                {isLoading && (
                  <span className={styles.loaderBtn}>
                    <Loader />
                  </span>
                )}
              </button>
            </Form>
          )}
        </Formik>
        <div className={styles.buttonWrapperGoogle}>
          <button onClick={handleGoogleLogin} className={styles.googleButton}>
            {t("signIn.signInGoogle")}
            <svg
              className={styles.googleIcon}
              width="20"
              height="20"
              aria-label="Google icon"
            >
              <use href={`${sprite}#icon-google-icon`}></use>
            </svg>
          </button>
        </div>
        <p className={styles.footerText}>
          {t("signIn.noAccount")}{" "}
          <NavLink to="/signup" className={styles.signupLink}>
            {t("signIn.signUp")}
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default SignInForm;
