import { Formik, Form, Field, ErrorMessage } from "formik";
import { NavLink } from "react-router-dom";
import { useId } from "react";
import * as Yup from "yup";
import { requestResetPasswordEmail } from "./ForgotPasswordApi.js";
import showToast from "../showToast.js";
import css from "./ForgotPasswordForm.module.css";

export default function ForgotPasswordForm() {
  const ForgotPasswordFormSchema = Yup.object().shape({
    email: Yup.string().email("Must be a valid email!").required("Required"),
  });

  const handleSubmit = (values, actions) => {
    requestResetPasswordEmail({ email: values.email })
      .then(() => {
        showToast("Email successfully sent!", "success");
      })
      .catch((e) => {
        showToast(`${e.message}`, "error");
      });
    actions.resetForm();
  };

  const emailFieldId = useId();

  return (
    <div className={css.wrapper}>
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={ForgotPasswordFormSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className={css.form} autoComplete="off">
            <h2 className={css.title}>Get email for update password</h2>
            <div className={css.fieldStyle}>
              <label className={css.label} htmlFor={emailFieldId}>
                Enter your email
              </label>
              <Field
                type="email"
                name="email"
                id={emailFieldId}
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
            </div>
            <button type="submit" className={css.btn}>
              Send
            </button>
            <NavLink to={"/signin"} className={css.link}>
              Sign in
            </NavLink>
          </Form>
        )}
      </Formik>
      <div className={css.signinPageBottle}></div>
    </div>
  );
}
