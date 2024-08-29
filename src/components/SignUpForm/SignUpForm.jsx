import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId } from "react";
import * as Yup from "yup";
// import toast from "react-hot-toast";
// import { useDispatch } from "react-redux";
// import { register } from "../../redux/auth/operations";
import css from "./SignUpForm.module.css";

export default function SignUpForm() {
//   const dispatch = useDispatch();

//   const validationControl = Yup.object().shape({
//     email: Yup.string()
//       .min(3, "Too Short!")
//       .max(50, "Too Long!")
//       .required("Required"),
//     password: Yup.string()
//       .min(5, "Too short")
//       .max(18, "Too long")
//       .required("Required"),
//   });

//   const handleSubmit = (values, actions) => {
//     dispatch(register(values))
//       .unwrap()
//       .then((data) => console.log(data))
//       .catch((err) => console.log(err));

//     actions.resetForm();
//   };

  return (
    <div className={css.form_box}>
      <h2 className={css.title}>Sign Up</h2>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        //   onSubmit={handleSubmit}
      >
        <Form className={css.form} autoComplete="off">
          <div className={css.fialdStyle}>
            <label className={css.label}>
              Enter your email
              <Field
                type="email"
                name="email"
                className={css.field}
                placeholder="E-mail"
              />
            </label>
            <label className={css.label}>
              Enter your password
              <Field
                type="password"
                name="password"
                className={css.field}
                placeholder="Password"
              />
            </label>
            <label className={css.label}>
              Repeat password
              <Field
                type="password"
                name="passwordRepeat"
                placeholder="Repeat password"
                className={css.field}
              />
            </label>
            <button type="submit" className={css.btn}>
              Sign Up
            </button>
          </div>
        </Form>
      </Formik>
      <p className={css.p}>Sign in</p>
    </div>
  );
}
