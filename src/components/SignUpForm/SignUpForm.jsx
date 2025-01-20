import { useState } from "react";
import { useSelector } from "react-redux";
import { register } from "../../redux/user/operations.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { NavLink } from "react-router-dom";
import styles from "./signUpForm.module.css";
import { orderSchemaReg } from "../../utils/formValidation.js";
import { selectIsRefreshing } from "../../redux/user/selectors.js";
import Loader from "../Loader/Loader.jsx";

//===============
import { useTranslation } from "react-i18next";
import LocalizationDropdown from "../LocalizationDropdown/LocalizationDropdown.jsx";
//================

export default function SignUpForm() {
  const { t } = useTranslation();
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
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsRefreshing);

  const handleSubmit = (values) => {
    const userData = { email: values.email, password: values.password };
    dispatch(register({ credentials: userData, navigate }));
  };

  return (
    <div className={styles.leftSection}>
      {/* //===================== */}
      <div className={styles.parentTwoVisible}>
        <LocalizationDropdown />
      </div>
      {/* //================= */}
      <h1 className={styles.brand}>AQUATRACK</h1>

      <div className={styles.card}>
        {/* <h2 className={styles.title}>Sign Up</h2> */}
        <h2 className={styles.title}>{t("signUp.signUp")}</h2>
        <Formik
          initialValues={initForm}
          validationSchema={orderSchemaReg}
          onSubmit={handleSubmit}
        >
          <Form action="#" className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                {/* Email */}
                {t("signUp.email")}
              </label>
              <Field
                name="email"
                type="email"
                id="email"
                className={`${styles.input} ${
                  initForm.name ? styles.error : styles.success
                }`}
                // placeholder="Enter your email"
                placeholder={t("signUp.enterEmail")}
                required
              />
              <ErrorMessage
                className={styles.errorMessage}
                name="email"
                component="p"
              />
            </div>
            <div className={styles.formGroup}>
              {/* <label htmlFor="RegisterPassword" className={styles.label}>
                Password
              </label> */}
              <label htmlFor="RegisterPassword" className={styles.label}>
                {t("signUp.password")}
              </label>
              <div className={styles.passwordWrapper}>
                <Field
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  id="RegisterPassword"
                  className={`${styles.input} ${
                    initForm.password ? styles.error : styles.success
                  }`}
                  // placeholder="Enter your password"
                  placeholder={t("signUp.enterPassword")}
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
                {/* Repeat password */}
                {t("signUp.repeatPassword")}
              </label>
              <div className={styles.passwordWrapper}>
                <Field
                  name="confirmPassword"
                  type={repeatPasswordVisible ? "text" : "password"}
                  id="repeatPassword"
                  className={`${styles.input} ${
                    initForm.confirmPassword ? styles.error : styles.success
                  }`}
                  // placeholder="Repeat password"
                  placeholder={t("signUp.repeatPassword")}
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
            {isLoading ? (
              <div className={styles.wrapperLoader}>
                <Loader />
              </div>
            ) : (
              <button type="submit" className={styles.submitButton}>
                {/* Sign Up */}
                {t("signUp.signUp")}
              </button>
            )}
          </Form>
        </Formik>
        {!isLoading && (
          <p className={styles.footerText}>
            {t("signUp.hasAccount")}
            {/* Don't have an account? */}{" "}
            <NavLink to="/signin" className={styles.signupLink}>
              {/* Sign In */}
              {t("signUp.signIn")}
            </NavLink>
          </p>
        )}
      </div>
    </div>
  );
}
