import { Helmet } from "react-helmet-async";

import SignUpForm from "../../components/SignUpForm/SignUpForm.jsx";
import MainAuth from "../../components/MainAuth/MainAuth.jsx";

import css from "./SignupPage.module.css";

export default function RegisterPage() {
  return (
    <>
      <Helmet>
        <title>Sign up page</title>
      </Helmet>

      <MainAuth>
        <div className={css.div}>
          <SignUpForm />
        </div>
      </MainAuth>
    </>
  );
}
