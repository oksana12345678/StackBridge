import { Helmet } from "react-helmet-async";

import SignUpForm from "../../components/SignUpForm/SignUpForm.jsx";
import MainAuth from "../../components/MainAuth/MainAuth.jsx";

const RegisterPage = () => {
  return (
    <>
      <Helmet>
        <title>Sign up page</title>
      </Helmet>

      <MainAuth>
        <SignUpForm />
      </MainAuth>
    </>
  );
};

export default RegisterPage;
