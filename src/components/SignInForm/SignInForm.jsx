import { NavLink } from "react-router-dom";
import css from "./SignInForm.module.css";
import * as Yup from "yup";
import { Field, Formik } from "formik";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { logIn } from "../../redux/auth/operations";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css"

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
});

const SignInForm = () => {
  const notify = (message) => {
    toast(message);
  };
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (values, action) => {
    const { email, password } = values;
    dispatch(
      logIn({
        email,
        password,
      })
    );

    action.resetForm();
  };

  return (
    <div className={css.signinPageWrapper}>
      <ToastContainer />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ touched, errors }) => (
          <form className={css.form} onSubmit={handleSubmit}>
            <h4 className={css.signinPageTitle}>Sign In</h4>
            <label className={css.label} htmlFor="email">
              Enter your email
            </label>
            <Field
              type="email"
              name="email"
              id="email"
              placeholder="E-mail"
              className={touched.email && errors.email ? css.inputError : ""}
              autoComplete="email"
            />
            {touched.email && errors.email && (
              <div className={css.errorMsg}>{errors.email}</div>
            )}

            <label className={css.label} htmlFor="password">
              Enter your password
            </label>
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
                <FaEyeSlash className={css.faEyeSlash} />
              )}
            </button>
            <Field
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Password"
              className={
                touched.password && errors.password ? css.inputError : ""
              }
              autoComplete="current-password"
            />
            {touched.password && errors.password && (
              <div className={css.errorMsg}>{errors.password}</div>
            )}

            <button
              className={css.signinPageButton}
              onClick={() => notify("Signing in...")}
              type="submit"
            >
              Sign In
            </button>
            <NavLink className={css.signinPageLink} to={"/forgot-password"}>
              Forgot password?
            </NavLink>
            <NavLink className={css.signinPageLink} to={"/signup"}>
              Sign up
            </NavLink>
          </form>
        )}
      </Formik>
      <div className={css.signinPageBottle}></div>
    </div>
  );
};

export default SignInForm;
