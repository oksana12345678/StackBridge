import { Helmet } from "react-helmet-async";

import SigninForm from "../../components/common/SignInForm/SignInForm.jsx";
import MainAuth from "../../components/MainAuth/MainAuth.jsx";

const SigninPage = () => {
  return (
    <>
      <Helmet>
        <title>Sign in page</title>
      </Helmet>

      <MainAuth>
        <SigninForm />
      </MainAuth>
    </>
  );
};

export default SigninPage;
