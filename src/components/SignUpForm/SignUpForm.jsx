import { Formik, Form, Field, ErrorMessage } from "formik";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";
import "react-toastify/ReactToastify.css";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import css from "./SignUpForm.module.css";
import  { useState } from "react";
import showToast from "../showToast";
import { EyeToggle } from "../AuthFieldItems/AuthFieldItems";

export default function SignUpForm() {
  const dispatch = useDispatch();

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

  const handleSubmit = (values) => {
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
              <div className={css.blockField}>
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
                  className={`${css.field} ${
                    touched.password && errors.password ? css.fieldError : ""
                  }`}
                  placeholder="Password"
                />
                <EyeToggle
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                />
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

                <EyeToggle
                  showPassword={showPassword1}
                  setShowPassword={setShowPassword1}
                />
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
