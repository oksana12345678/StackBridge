import { Formik, Form, Field, ErrorMessage } from "formik";
import { NavLink } from "react-router-dom";
import { useId } from "react";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import css from "./SignUpForm.module.css";
import { SignInSignUpWrapper } from "../SignInSignUpWrapper/SignInSignUpWrapper";

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
    <SignInSignUpWrapper
      // contactsSchema={contactsSchema}
      handleSubmit={handleSubmit}
      // showPassword={showPassword}
      // setShowPassword={setShowPassword}
    />
    // <div className={css.form_box}>
    //   <h2 className={css.title}>Sign Up</h2>
    //   <Formik
    //     initialValues={{
    //       name: "",
    //       email: "",
    //       password: "",
    //     }}
    //     onSubmit={handleSubmit}
    //   >
    //     <Form className={css.form} autoComplete="off">
    //       <div className={css.fialdStyle}>
    //         <label className={css.label}>
    //           Enter your email
    //           <Field
    //             type="email"
    //             name="email"
    //             className={css.field}
    //             placeholder="E-mail"
    //           />
    //         </label>
    //         <label className={css.label}>
    //           Enter your password
    //           <Field
    //             type="password"
    //             name="password"
    //             className={css.field}
    //             placeholder="Password"
    //           />
    //         </label>
    //         <label className={css.label}>
    //           Repeat password
    //           <Field
    //             type="password"
    //             name="passwordRepeat"
    //             placeholder="Repeat password"
    //             className={css.field}
    //           />
    //         </label>
    //         <button type="submit" className={css.btn}>
    //           Sign Up
    //         </button>
    //       </div>
    //     </Form>
    //   </Formik>
    //   <nav className={css.nav}>
    //     <NavLink to="/signin" className={css.link}>
    //       Sign in
    //     </NavLink>
    //   </nav>
    // </div>
  );
}
