import { useId } from "react";
import { Field, ErrorMessage } from "formik";
import Label from "./Label/Label";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import clsx from "clsx";
import css from "./SettingModal.module.css";

const OldPasswordGroup = ({ isHiddenPassword, isError, isTouched, toggle }) => {
  const oldPasswordInputId = useId();
  return (
    <div className={css["password-sub-group"]}>
      <Label htmlFor={oldPasswordInputId} type="thin">
        Outdated password:
      </Label>
      <div className={css["input-wrapper"]}>
        <Field
          autoComplete="off"
          className={clsx(css.input, {
            [css["error-input"]]: isError && isTouched,
          })}
          id={oldPasswordInputId}
          type={isHiddenPassword ? "text" : "password"}
          name="outdatedPassword"
          placeholder="Password"
        />
        {isHiddenPassword ? (
          <button
            className={css["eye-button"]}
            onClick={(event) => {
              event.preventDefault();
              toggle("oldPassword");
            }}
          >
            <HiOutlineEye className={css["eye-icon"]} />
          </button>
        ) : (
          <button
            className={css["eye-button"]}
            onClick={(event) => {
              event.preventDefault();
              toggle("oldPassword");
            }}
          >
            <HiOutlineEyeOff className={css["eye-icon"]} />
          </button>
        )}
        <ErrorMessage
          name="outdatedPassword"
          component="div"
          className={css["error-message"]}
        />
      </div>
    </div>
  );
};

export default OldPasswordGroup;
