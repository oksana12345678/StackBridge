import { Formik, Form, Field, ErrorMessage } from "formik";
import { NavLink } from "react-router-dom";
import { useId } from "react";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import css from "./SignUpForm.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import React, { useState } from "react";
import WaveEffectButton from "../WaveEffectButton/WaveEffectButton";

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
  const showToast = (message, type) => {
    toast(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: type === "success" ? "light" : "colored",
      type: type,
    });
  };
  const handleSubmit = (values, actions) => {
    const { email, password } = values;
    dispatch(
      register({
        email,
        password,
      })
    )
      .unwrap()
      .then(() => {
        showToast("Registered successful!", "success");
      })
      .catch(() => {
        showToast("Incorrect login or password", "error");
      });
  };
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

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
        {({ errors, touched }) => (
          <Form className={css.form} autoComplete="off">
            <div className={css.fialdStyle}>
              <div>
                <label className={css.label}>Enter your email</label>

                <Field
                  type="email"
                  name="email"
                  className={`${css.field} ${
                    touched.email && errors.email ? css.fieldError : ""
                  }`}
                  placeholder="E-mail"
                />
                <ErrorMessage
                  className={css.msgErr}
                  name="email"
                  component="span"
                />
              </div>

              <div className={css.blockField}>
                <label className={css.label}>Enter your password</label>
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  className={`${css.field} ${
                    touched.password && errors.password ? css.fieldError : ""
                  }`}
                  placeholder="Password"
                />

                <button
                  type="button"
                  name="password"
                  className={css.eyebtn}
                  width="44"
                  height="44"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEye size="20" className={css.eye} />
                  ) : (
                    <FaEyeSlash size="20" className={css.eye} />
                  )}
                </button>
                <ErrorMessage
                  className={css.msgErr}
                  name="password"
                  component="span"
                />
              </div>

              <div className={css.blockField}>
                <label className={css.label}>Repeat password</label>
                <Field
                  type={showPassword1 ? "text" : "password"}
                  name="repeatPassword"
                  className={`${css.field} ${
                    touched.repeatPassword && errors.repeatPassword
                      ? css.fieldError
                      : ""
                  }`}
                  placeholder="Repeat password"
                />

                <button
                  type="button"
                  className={css.eyebtn}
                  width="44"
                  height="44"
                  onClick={() => setShowPassword1(!showPassword1)}
                >
                  {showPassword1 ? (
                    <FaEye size="20" className={css.eye} />
                  ) : (
                    <FaEyeSlash size="20" className={css.eye} />
                  )}
                </button>
                <ErrorMessage
                  className={css.msgErr}
                  name="repeatPassword"
                  component="span"
                />
              </div>
              <WaveEffectButton>
                <button type="submit" className={css.btn}>
                  Sign Up
                </button>
              </WaveEffectButton>
            </div>
          </Form>
        )}
      </Formik>
      <nav className={css.nav}>
        <NavLink to="/signin" className={css.link}>
          Sign in
        </NavLink>
      </nav>
    </div>
  );
}
