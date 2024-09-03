import { Helmet } from "react-helmet-async";
import ForgotPasswordForm from "../../components/ForgotPasswordForm/ForgotPasswordForm.jsx";
import MainAuth from "../../components/MainAuth/MainAuth.jsx";

export default function ForgotPasswordPage() {
  return (
    <>
      <Helmet>
        <title>Forgot password page</title>
      </Helmet>

      <MainAuth>
        <ForgotPasswordForm />
      </MainAuth>
    </>
  );
}
