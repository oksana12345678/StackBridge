import { Formik, Form, Field, ErrorMessage } from "formik";
import { NavLink } from "react-router-dom";
import { useId } from "react";
import * as Yup from "yup";
// import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import css from "./SignUpForm.module.css";
import fieldEye from "./fieldEye";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

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

  const handleSubmit = (values, actions) => {
    // dispatch(register(values))
    //   .unwrap()
    //   .then((data) => console.log(data))
    //   .catch((err) => console.log(err));
    const { email, password } = values;
    dispatch(
      register({
        email,
        password,
      })
    );
    actions.resetForm();
  };

  return (
    <div className={css.form_box}>
      <h2 className={css.title}>Sign Up</h2>
      <Formik
        initialValues={{
          email: "",
          password: "",
          repeatPassword: "",
        }}
        // validate={(values) => {
        //   const errors = {};
        //   if (values.password !== values.repeatPassword) {
        //     errors.repeatPassword = "Password don't match";
        //   }
        //   return errors;
        // }}
        validationSchema={validationControl}
        onSubmit={handleSubmit}
      >
        <Form className={css.form} autoComplete="off">
          <div className={css.fialdStyle}>
            <div>
              <label className={css.label}>Enter your email</label>
              {/* {ErrorMessage  ? (
                <Field
                  type="email"
                  name="email"
                  className={css.errField}
                  placeholder="E-mail"
                />
              ) : ( */}
              <Field
                type="email"
                name="email"
                className={css.field}
                placeholder="E-mail"
              />
              <HiOutlineEyeOff />

              <ErrorMessage
                className={css.msgErr}
                name="email"
                component="span"
              />
            </div>
            <div>
              <label className={css.label}>Enter your password</label>
              <Field
                type="password"
                name="password"
                className={css.field}
                placeholder="Password"
              />
              <ErrorMessage
                className={css.msgErr}
                name="password"
                component="span"
              />
            </div>
            <div>
              <label className={css.label}>Repeat password</label>
              <Field
                type="password"
                name="repeatPassword"
                placeholder="Repeat password"
                className={css.field}
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
      </Formik>
      <nav className={css.nav}>
        <NavLink to="/signin" className={css.link}>
          Sign in
        </NavLink>
      </nav>
    </div>
  );
}
