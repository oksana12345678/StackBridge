import { Field } from "formik";
import { useId } from "react";
import css from "./RadioPair.module.css";

const RadioPair = ({ labelLeft, labelRight }) => {
  const womanRadioId = useId();
  const manRadioId = useId();

  return (
    <div className={css.radioGroup}>
      <label className={css.radioLabel}>
        <Field
          id={womanRadioId}
          type="radio"
          name="gender"
          value="woman"
          className={css.radioInput}
        />
        <span className={css.radioMark}></span>
        {labelLeft}
      </label>
      <label className={css.radioLabel}>
        <Field
          id={manRadioId}
          type="radio"
          name="gender"
          value="man"
          className={css.radioInput}
        />
        <span className={css.radioMark}></span>
        {labelRight}
      </label>
    </div>
  );
};

export default RadioPair;
