import { Helmet } from "react-helmet-async";
import UpdatePasswordForm from "../../components/UpdatePasswordForm/UpdatePasswordForm.jsx";
import MainAuth from "../../components/MainAuth/MainAuth.jsx";

export default function UpdatePasswordPage() {
  return (
    <>
      <Helmet>
        <title>Update password page</title>
      </Helmet>

      <MainAuth>
        <UpdatePasswordForm />
      </MainAuth>
    </>
  );
}
