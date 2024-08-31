import { Helmet } from "react-helmet-async";
// import clsx from "clsx";
// import Image from "next/image";

import css from "./SignupPage.module.css";
import SignUpForm from "../../components/SignUpForm/SignUpForm";

export default function SignupPage() {
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
