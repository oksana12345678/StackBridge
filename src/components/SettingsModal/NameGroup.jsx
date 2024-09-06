import { useId } from "react";
import clsx from "clsx";
import { Field, ErrorMessage } from "formik";
import Label from "./Label/Label";
import css from "./SettingModal.module.css";


const NameGroup = ({ isTouched, isError }) => {
  const nameInputId = useId();

  return (
    <div className={css["name-group"]}>
      <Label htmlFor={nameInputId} type="thick">
        Your name
      </Label>
      <div>
        <div className={css["input-wrapper"]}>
          <Field
            className={clsx(css.input, {
              [css["error-input"]]: isError && isTouched,
            })}
            id={nameInputId}
            type="text"
            name="name"
            placeholder="Enter your name"
          />
          <ErrorMessage
            name="name"
            component="div"
            className={css["error-message"]}
          />
        </div>
      </div>
    </div>
  );
};

export default NameGroup;
