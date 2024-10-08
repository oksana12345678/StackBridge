import { useId } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

import { useToggle } from "../../hooks/useToggle.js";

import css from "./SignInSignUpWrapper.module.css";
import WaveEffectButton from "../WaveEffectButton/WaveEffectButton.jsx";

export const SignInSignUpWrapper = ({ contactsSchema, handleSubmit }) => {
  const [showPassword, toggle] = useToggle();
  const { pathname } = useLocation();

  const signinFieldId = useId();
  const signupFieldId = useId();

  return (
    <div
      className={`${css.signinPageWrapper} ${
        pathname === "/signup" && css.signupWrapper
      }`}
    >
      <Formik
        initialValues={{ email: "", password: "", repeatPassword: "" }}
        validationSchema={contactsSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form
            className={`${css.form} ${
              pathname === "/signin" && css.formSignin
            }`}
            autoComplete="off"
          >
            <h2 className={css.signinPageTitle}>
              Sign {pathname === "/signin" ? "in" : "up"}
            </h2>

            <div className={css.labelInputWrapper}>
              <label
                className={css.label}
                htmlFor={
                  pathname === "/signin"
                    ? `${signinFieldId}-email`
                    : `${signupFieldId}-email`
                }
              >
                Enter your email
              </label>
              <Field
                type="email"
                name="email"
                id={
                  pathname === "/signin"
                    ? `${signinFieldId}-email`
                    : `${signupFieldId}-email`
                }
                placeholder="Enter your email"
                className={`${css.input} ${
                  errors.email && touched.email ? css.inputError : ""
                }`}
              />
              <ErrorMessage
                className={css.errorMsg}
                name="email"
                component="span"
              />
            </div>

            <div className={css.labelInputWrapper}>
              <label
                className={css.label}
                htmlFor={
                  pathname === "/signin"
                    ? `${signinFieldId}-password`
                    : `${signupFieldId}-password`
                }
              >
                Enter your password
              </label>
              <div className={css.passwordWrapper}>
                <Field
                  type={showPassword.password ? "text" : "password"}
                  name="password"
                  id={
                    pathname === "/signin"
                      ? `${signinFieldId}-password`
                      : `${signupFieldId}-password`
                  }
                  placeholder="Enter your password"
                  className={`${css.input} ${
                    errors.password && touched.password ? css.inputError : ""
                  }`}
                />
                <button
                  type="button"
                  className={css.eyeBtn}
                  onClick={(event) => {
                    event.preventDefault();
                    toggle("password");
                  }}
                >
                  {showPassword.password ? (
                    <HiOutlineEye className={css.faEye} />
                  ) : (
                    <HiOutlineEyeOff className={css.faEye} />
                  )}
                </button>
              </div>
              <ErrorMessage
                className={css.errorMsg}
                name="password"
                component="span"
              />
            </div>
            {pathname === "/signin" ? undefined : (
              <>
                <div className={css.labelInputWrapper}>
                  <label
                    className={css.label}
                    htmlFor={`${signupFieldId}-repeatPassword`}
                  >
                    Repeat password
                  </label>
                  <div className={css.passwordWrapper}>
                    <Field
                      type={showPassword.repeatPassword ? "text" : "password"}
                      name="repeatPassword"
                      id={`${signupFieldId}-repeatPassword`}
                      placeholder="Repeat your password"
                      className={`${css.input} ${
                        errors.repeatPassword && touched.repeatPassword
                          ? css.inputError
                          : ""
                      }`}
                    />
                    <button
                      type="button"
                      className={css.eyeBtn}
                      onClick={(event) => {
                        event.preventDefault();
                        toggle("repeatPassword");
                      }}
                    >
                      {showPassword.repeatPassword ? (
                        <HiOutlineEye className={css.faEye} />
                      ) : (
                        <HiOutlineEyeOff className={css.faEye} />
                      )}
                    </button>
                  </div>
                  <ErrorMessage
                    className={css.errorMsg}
                    name="repeatPassword"
                    component="span"
                  />
                </div>
              </>
            )}
            <WaveEffectButton>
              <button className={css.signinPageButton} type="submit">
                Sign {pathname === "/signin" ? "in" : "up"}
              </button>
            </WaveEffectButton>
            {pathname === "/signin" ? (
              <NavLink className={css.signinPageLink} to={"/forgot-password"}>
                Forgot password?
              </NavLink>
            ) : undefined}
            <NavLink
              className={css.signinPageLink}
              to={pathname === "/signup" ? "/signin" : "/signup"}
            >
              Sign {pathname === "/signin" ? "up" : "in"}
            </NavLink>
          </Form>
        )}
      </Formik>
      <div className={css.signinPageBottle}></div>
    </div>
  );
};
