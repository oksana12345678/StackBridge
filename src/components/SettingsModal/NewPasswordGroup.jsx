import { useId } from "react";
import clsx from "clsx";
import { Field, ErrorMessage } from "formik";
import Label from "./Label/Label";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import css from "./SettingModal.module.css";

const NewPasswordGroup = ({ isHiddenPassword, toggle, isError, isTouched }) => {
  const passwordInputId = useId();
  return (
    <div className={css["password-sub-group"]}>
      <Label htmlFor={passwordInputId} type="thin">
        New Password:
      </Label>
      <div className={css["input-wrapper"]}>
        <Field
          className={clsx(css.input, {
            [css["error-input"]]: isError && isTouched,
          })}
          id={passwordInputId}
          type={isHiddenPassword ? "text" : "password"}
          name="password"
          placeholder="Enter new password"
        />
        {isHiddenPassword ? (
          <button
            className={css["eye-button"]}
            onClick={(event) => {
              event.preventDefault();
              toggle("password");
            }}
          >
            <HiOutlineEye className={css["eye-icon"]} />
          </button>
        ) : (
          <button
            className={css["eye-button"]}
            onClick={(event) => {
              event.preventDefault();
              toggle("password");
            }}
          >
            <HiOutlineEyeOff className={css["eye-icon"]} />
          </button>
        )}
        <ErrorMessage
          name="password"
          component="div"
          className={css["error-message"]}
        />
      </div>
    </div>
  );
};

export default NewPasswordGroup;
