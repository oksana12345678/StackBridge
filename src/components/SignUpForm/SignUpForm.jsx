import { Formik, Form, Field, ErrorMessage } from "formik";
import { NavLink } from "react-router-dom";
import { useId } from "react";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import css from "./SignUpForm.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import React, { useState } from "react";

export default function SignUpForm() {
  const dispatch = useDispatch();
  const notify = () => {
    toast("");
  };
  const validationControl = Yup.object().shape({
    email: Yup.string()
      .min(8, "Too Short!")
      .max(64, "Too Long!")
      .required("Required"),
    password: Yup.string()
      .min(8, "Too short")
      .max(64, "Too long")
      .required("Required"),
    repeatPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password don't match")
      .required("Required"),
  });

  const handleSubmit = (values, actions) => {

    const { email, password } = values;
    dispatch(
      register({
        email,
        password,
      })
    );
    actions.resetForm();
  };
  const [showPassword, setShowPassword] = useState(false);
const handleTogglePassword = (fieldName) => {
  if (fieldName === "password" || fieldName === "repeatPassword") {
    setShowPassword(!showPassword);
  }
};


  return (
    <div className={css.form_box}>
      <ToastContainer />
      <h2 className={css.title}>Sign Up</h2>

      <Formik
        initialValues={{
          email: "",
          password: "",
          repeatPassword: "",
        }}
        validationSchema={validationControl}
        onSubmit={handleSubmit}
      >
        <Form className={css.form} autoComplete="off">
          <div className={css.fialdStyle}>
            <div>
              <label className={css.label}>Enter your email</label>

              <Field
                type="email"
                name="email"
                className={css.field}
                placeholder="E-mail"
              />
              <ErrorMessage
                className={css.msgErr}
                name="email"
                component="span"
              />
            </div>
            <div>
              <label className={css.label}>Enter your password</label>
              <Field
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"

                className={css.field}
                placeholder="Password"
              />

              <button
                type="button"
                onClick={() => handleTogglePassword("password")}
                // onClick={() => setShowPassword(!showPassword)}
                className="eye"
              >
                {showPassword ? (
                  <FaEyeSlash size="16" className="css.eye" />
                ) : (
                  <FaEye size="16" className="css.eye" />
                )}
              </button>
              <ErrorMessage
                className={css.msgErr}
                name="password"
                component="span"
              />
            </div>
            <div>
              <label className={css.label}>Repeat password</label>
              <Field
                type={showPassword ? "text" : "password"}
                name="repeatPassword"
                id="repeatPassword"
                placeholder="Repeat password"
                className={css.field}
              />
              <button
                type="button"
                // onClick={() => setShowPassword(!showPassword)}
                onClick={() => handleTogglePassword("repeatPassword")}
                className="eye"
              >
                {showPassword ? (
                  <FaEyeSlash size="16" className="css.eye" />
                ) : (
                  <FaEye size="16" className="css.eye" />
                )}
              </button>
              <ErrorMessage
                className={css.msgErr}
                name="repeatPassword"
                component="span"
              />
            </div>

            <button type="submit" className={css.btn}>
              Sign Up
            </button>
          </div>
        </Form>
      </Formik>
      <nav className={css.nav}>
        <NavLink to="/signin" className={css.link}>
          Sign in
        </NavLink>
      </nav>
    </div>
  );
}
