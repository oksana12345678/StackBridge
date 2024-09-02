import { useState } from "react";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import { SignInSignUpWrapper } from "../SignInSignUpWrapper/SignInSignUpWrapper";
import showToast from "../showToast.js";

export default function SignUpForm() {
  const dispatch = useDispatch();
  const validationControl = Yup.object().shape({
    email: Yup.string()
      .min(8, "Too Short!")
      .max(64, "Too Long!")
      .required("Required"),
    password: Yup.string()
      .min(8, "Too short")
      .max(64, "Too long")
      .required("Required"),
    repeatPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password don't match")
      .required("Required"),
  });
  const handleSubmit = (values, actions) => {
    const { email, password } = values;
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
      });
  };
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  return (
    <SignInSignUpWrapper
      contactsSchema={validationControl}
      handleSubmit={handleSubmit}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      // showPassword1={showPassword1}
      // setShowPassword1={setShowPassword1}
    />
  );
}
