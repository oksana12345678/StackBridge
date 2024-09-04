import * as Yup from "yup";
import { useDispatch } from "react-redux";

import { logIn } from "../../redux/auth/operations.js";
import { SignInSignUpWrapper } from "../SignInSignUpWrapper/SignInSignUpWrapper.jsx";
import showToast from "../showToast.js";

const SignInForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    const { email, password } = values;
    dispatch(
      logIn({
        email,
        password,
      })
    )
      .unwrap()
      .then(() => {
        showToast("Login successful!", "success");
        actions.resetForm();
      })
      .catch(() => {
        showToast("Login failed!", "error");
      });
  };

  const contactsSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(8, "Too Short!")
      .max(64, "Too Long!")
      .required("Required"),
  });

  return (
    <SignInSignUpWrapper
      contactsSchema={contactsSchema}
      handleSubmit={handleSubmit}
    />
  );
};

export default SignInForm;
