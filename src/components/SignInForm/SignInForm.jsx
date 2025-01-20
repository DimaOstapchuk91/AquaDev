import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import styles from './signInForm.module.css';
import { logIn } from '../../redux/user/operations.js';
import { useDispatch } from 'react-redux';
import { orderSchemaLogin } from '../../utils/formValidation.js';
import { selectIsRefreshing } from '../../redux/user/selectors.js';
import Loader from '../Loader/Loader.jsx';
import sprite from '../../assets/sprite.svg';

const SignInForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const initForm = {
    email: '',
    password: '',
  };

  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsRefreshing);

  const handleSubmit = values => {
    dispatch(logIn(values));
  };

  return (
    <div className={styles.leftSection}>
      <h1 className={styles.brand}>AQUATRACK</h1>
      <div className={styles.card}>
        <h2 className={styles.title}>Sign In</h2>
        <Formik
          initialValues={initForm}
          validationSchema={orderSchemaLogin}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor='email' className={styles.label}>
                  Email
                </label>
                <Field
                  name='email'
                  type='email'
                  id='email'
                  className={`${styles.input} ${
                    touched.email
                      ? errors.email
                        ? styles.error
                        : styles.success
                      : ''
                  }`}
                  placeholder='Enter your email'
                  required
                />
                <ErrorMessage
                  className={styles.errorMessage}
                  name='email'
                  component='p'
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor='password' className={styles.label}>
                  Password
                </label>
                <div className={styles.passwordWrapper}>
                  <Field
                    name='password'
                    type={passwordVisible ? 'text' : 'password'}
                    id='password'
                    className={`${styles.input} ${
                      touched.password
                        ? errors.password
                          ? styles.error
                          : styles.success
                        : ''
                    }`}
                    placeholder='Enter your password'
                    required
                  />
                  <button
                    type='button'
                    className={styles.togglePassword}
                    onClick={togglePasswordVisibility}
                  >
                    {passwordVisible ? (
                      <svg
                        width='15'
                        height='15'
                        className={`${styles.eye} ${
                          touched.password
                            ? errors.password
                              ? styles.error
                              : styles.success
                            : ''
                        }`}
                      >
                        <use href={`${sprite}#icon-eye`}></use>
                      </svg>
                    ) : (
                      <svg
                        width='15'
                        height='15'
                        className={`${styles.eye} ${
                          touched.password
                            ? errors.password
                              ? styles.error
                              : styles.success
                            : ''
                        }`}
                      >
                        <use href={`${sprite}#icon-eye-off`}></use>
                      </svg>
                    )}
                  </button>
                </div>
                <ErrorMessage
                  className={styles.errorMessage}
                  name='password'
                  component='p'
                />
              </div>

              <button
                type='submit'
                disabled={isLoading}
                className={styles.submitButton}
              >
                Sign In{' '}
                {isLoading && (
                  <span className={styles.loaderBtn}>
                    <Loader />
                  </span>
                )}
              </button>
            </Form>
          )}
        </Formik>
        <p className={styles.footerText}>
          Don&apos;t have an account?{' '}
          <NavLink to='/signup' className={styles.signupLink}>
            Sign Up
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default SignInForm;
