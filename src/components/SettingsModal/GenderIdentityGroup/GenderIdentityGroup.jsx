import RadioPair from "../../common/RadioPair/RadioPair";
import css from "../SettingModal.module.css";

const GenderIdentityGroup = () => {
  return (
    <div className={css["gender-identity-group"]}>
      <h3 className={css.subtitle}>Your gender identity</h3>
      <RadioPair labelLeft="Woman" labelRight="Man" />
    </div>
  );
};

export default GenderIdentityGroup;
