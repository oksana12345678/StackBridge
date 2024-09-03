import { ErrorMessage, Field, Formik, Form } from "formik";
import css from "./SignInSignUpWrapper.module.css";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

export const SignInSignUpWrapper = ({
  contactsSchema,
  handleSubmit,
  showPassword,
  setShowPassword,
}) => {
  const { pathname } = useLocation();

  return (
    <div className={css.signinPageWrapper}>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={contactsSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className={css.form}>
            <h2 className={css.signinPageTitle}>
              Sign {pathname === "/signin" ? "in" : "up"}
            </h2>
            <div className={css.labelInputWrapper}>
              <label className={css.label} htmlFor="email">
                Enter your email
              </label>
              <div className={css.inputErrorContainer}>
                <Field
                  type="email"
                  name="email"
                  id="email"
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
            </div>

            <div className={css.labelInputWrapper}>
              <label className={css.label} htmlFor="password">
                Enter your password
              </label>
              <div className={css.inputErrorContainer}>
                <div className={css.passwordWrapper}>
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
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
                      setShowPassword(!showPassword);
                    }}
                  >
                    {showPassword ? (
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
            </div>
            {pathname === "/signin" ? undefined : (
              <>
                {" "}
                <div className={css.labelInputWrapper}>
                  <label className={css.label} htmlFor="password">
                    Repeat password
                  </label>
                  <div className={css.inputErrorContainer}>
                    <div className={css.passwordWrapper}>
                      <Field
                        type={showPassword ? "text" : "password"}
                        name="repeatPassword"
                        id="repeatPassword"
                        placeholder="Repeat your password"
                        className={`${css.input} ${
                          errors.password && touched.password
                            ? css.inputError
                            : ""
                        }`}
                      />
                      <button
                        type="button"
                        className={css.eyeBtn}
                        onClick={(event) => {
                          event.preventDefault();
                          setShowPassword(!showPassword);
                        }}
                      >
                        {showPassword ? (
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
                </div>
              </>
            )}

            <button className={css.signinPageButton} type="submit">
              Sign {pathname === "/signin" ? "in" : "up"}
            </button>
            <NavLink className={css.signinPageLink} to={"/forgot-password"}>
              Forgot password?
            </NavLink>
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
