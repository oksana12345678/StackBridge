import { NavLink } from "react-router-dom";
import css from "./SignInForm.module.css";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { logIn } from "../../redux/auth/operations";
import showToast from "../showToast";

const SignInForm = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (values, actions) => {
    const { email, password } = values;
    dispatch(
      logIn({
        email,
        password,
      })
    )
      .unwrap()
      .then(() => {
        showToast("Login successful!", "success");
        actions.resetForm();
      })
      .catch(() => {
        showToast("Login failed!", "error");
      });
  };

  const contactsSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(8, "Too Short!")
      .max(64, "Too Long!")
      .required("Required"),
  });

  return (
    <div className={css.signinPageWrapper}>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={contactsSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className={css.form}>
            <h4 className={css.signinPageTitle}>Sign In</h4>
            <label className={css.label} htmlFor="email">
              Enter your email
            </label>
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

            <label className={css.label} htmlFor="password">
              Enter your password
            </label>
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
                className={css.eyeBtn}
                onClick={(event) => {
                  event.preventDefault();
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? (
                  <FaEye className={css.faEye} />
                ) : (
                  <FaEyeSlash className={css.faEye} />
                )}
              </button>
            </div>
            <ErrorMessage
              className={css.errorMsg}
              name="password"
              component="span"
            />

            <button className={css.signinPageButton} type="submit">
              Sign In
            </button>
            <NavLink className={css.signinPageLink} to={"/forgot-password"}>
              Forgot password?
            </NavLink>
            <NavLink className={css.signinPageLink} to={"/signup"}>
              Sign up
            </NavLink>
          </Form>
        )}
      </Formik>
      <div className={css.signinPageBottle}></div>
    </div>
  );
};

export default SignInForm;
