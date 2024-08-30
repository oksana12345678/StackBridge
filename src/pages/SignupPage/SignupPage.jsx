import { Helmet } from "react-helmet-async";
// import clsx from "clsx";
// import Image from "next/image";

import SignUpForm from "../../components/SignUpForm/SignUpForm.jsx";
import css from "./SignupPage.module.css";

export default function RegisterPage() {
  return (
    <>
      <Helmet>
        <title>Sign up page</title>
      </Helmet>

      <div className={css.div}>
        <SignUpForm />
      </div>
    </>
  );
}
