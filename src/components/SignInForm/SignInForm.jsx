import { NavLink } from "react-router-dom";
import css from "./SignInForm.module.css";
import * as Yup from "yup";
import { Field, Formik } from "formik";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { logIn } from "../../redux/auth/operations";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
});

const SignInForm = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async ({ email, password }, { resetForm }) => {
    dispatch(
      logIn({
        email,
        password,
      })
    );
    resetForm();
  };

  return (
    <div className={css.signinPageWrapper}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ touched, errors }) => (
          <form className={css.form}>
            <h4 className={css.signinPageTitle}>Sign In</h4>
            <p className={css.label} htmlFor="email">
              Enter your email
            </p>
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

            <p className={css.label} htmlFor="password">
              Enter your password
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
            </p>
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

            <button className={css.signinPageButton} type="submit">
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
