import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations.js";
import { SignInSignUpWrapper } from "../SignInSignUpWrapper/SignInSignUpWrapper.jsx";
import showToast from "../showToast.js";
import Loader from '../Loader/Loader.jsx'
import { useState } from "react";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  
  const validationControl = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(8, "Too short")
      .max(64, "Too long")
      .required("Required"),
    repeatPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password don't match")
      .required("Required"),
  });

  const handleSubmit = (values) => {
    const { email, password } = values;
    setIsLoading(true);
    dispatch(
      register({
        email,
        password,
      })
    )
      .unwrap()
      .then(() => {
        showToast("Registered successful!", "success");
      })
      .catch(() => {
        showToast("Incorrect login or password", "error");
      })
      .finally(() => {
        setIsLoading(false); 
      });
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <SignInSignUpWrapper
          contactsSchema={validationControl}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default SignUpForm;
