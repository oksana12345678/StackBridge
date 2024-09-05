import { useId } from "react";
import { Field, ErrorMessage } from "formik";
import Label from "./Label/Label";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import clsx from "clsx";
import css from "./SettingModal.module.css";

const RepeatPasswordGroup = ({
  isHiddenPassword,
  isError,
  isTouched,
  toggle,
}) => {
  const repeatPasswordInputId = useId();

  return (
    <div className={css["password-sub-group"]}>
      <Label htmlFor={repeatPasswordInputId} type="thin">
        Repeat new password:
      </Label>
      <div>
        <div className={css["input-wrapper"]}>
          <Field
            className={clsx(css.input, {
              [css["error-input"]]: isError && isTouched,
            })}
            id={repeatPasswordInputId}
            type={isHiddenPassword ? "text" : "password"}
            name="repeatPassword"
            placeholder="Password"
          />
          {isHiddenPassword ? (
            <button
              className={css["eye-button"]}
              onClick={(event) => {
                event.preventDefault();
                toggle("repeatPassword");
              }}
            >
              <HiOutlineEye className={css["eye-icon"]} />
            </button>
          ) : (
            <button
              className={css["eye-button"]}
              onClick={(event) => {
                event.preventDefault();
                toggle("repeatPassword");
              }}
            >
              <HiOutlineEyeOff className={css["eye-icon"]} />
            </button>
          )}{" "}
          <ErrorMessage
            name="repeatPassword"
            component="div"
            className={css["error-message"]}
          />
        </div>
      </div>
    </div>
  );
};

export default RepeatPasswordGroup;
