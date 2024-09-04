import { useId } from "react";
import { Field } from "formik";
import css from "./GenderIdentityGroup.module.css";
import coreSettingsCss from "../SettingModal.module.css";

const GenderIdentityGroup = ({ labelLeft, labelRight }) => {
  const womanRadioId = useId();
  const manRadioId = useId();

  return (
    <div className={coreSettingsCss["gender-identity-group"]}>
      <h3 className={coreSettingsCss.subtitle}>Your gender identity</h3>
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
    </div>
  );
};

export default GenderIdentityGroup;
