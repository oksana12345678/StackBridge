import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import { logIn } from "../../redux/auth/operations.js";
import { SignInSignUpWrapper } from "../SignInSignUpWrapper/SignInSignUpWrapper.jsx";
import showToast from "../showToast.js";
import Loader from "../Loader/Loader.jsx";
import { selectLoadingUserData } from "../../redux/auth/selectors.js";

const SignInForm = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoadingUserData);

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
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <SignInSignUpWrapper
          contactsSchema={contactsSchema}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default SignInForm;
