import { Formik, Form, Field, ErrorMessage } from "formik";
import { useSearchParams } from "react-router-dom";
import { useId, useState } from "react";
import * as Yup from "yup";
import showToast from "../showToast.js";
import css from "./UpdatePasswordForm.module.css";
import { UpdatePassword } from "./UpdatePasswordApi.js";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { useToggle } from "../../hooks/useToggle";

export default function UpdatePasswordForm() {
  const [showPassword, toggle] = useToggle();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const UpdatePasswordSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .max(64, "Password must be at most 64 characters")
      .required("Required"),
    repeatPassword: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .max(64, "Password must be at most 64 characters")
      .required("Required"),
  });

  const PasswordFieldId = useId();
  const PasswordRepeatFieldId = useId();

  const handleSubmit = (values, actions) => {
    if (values.password !== values.repeatPassword) {
      return showToast("Passwords don't match", "error");
    }

    if (!token) {
      return showToast("Token is missing", "error");
    }

    UpdatePassword({ password: values.password, token })
      .then(() => {
        showToast("Password successfully updated!", "success");
        window.location.href = "/signin";
      })
      .catch((e) => {
        showToast(`${e.message}`, "error");
      });

    actions.resetForm();
  };

  return (
    <div className={css.wrapper}>
      <Formik
        initialValues={{
          password: "",
          passwordRepeat: "",
        }}
        validationSchema={UpdatePasswordSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className={css.form} autoComplete="off">
            <h2 className={css.title}>Update password</h2>

            <div className={css.fieldStyle}>
              <label className={css.label} htmlFor={PasswordFieldId}>
                Enter your password
              </label>
              <div className={css.passwordWrapper}>
                <Field
                  type={showPassword.password ? "text" : "password"}
                  name="password"
                  id={PasswordFieldId}
                  placeholder="Enter your password"
                  className={`${css.input} ${
                    errors.password && touched.password ? css.inputError : ""
                  }`}
                />
                <button
                  type="button"
                  className={css.eyeBtn}
                  onClick={() => toggle("password")}
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
            <div className={css.fieldStyle}>
              <label className={css.label} htmlFor={PasswordRepeatFieldId}>
                Repeat password
              </label>
              <div className={css.passwordWrapper}>
                <Field
                  type={showPassword.repeatPassword ? "text" : "password"}
                  name="repeatPassword"
                  id={PasswordRepeatFieldId}
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
                  onClick={() => toggle("repeatPassword")}
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
            <button type="submit" className={css.btn}>
              Sign Up
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
