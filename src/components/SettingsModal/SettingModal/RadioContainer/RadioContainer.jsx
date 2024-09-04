import css from "./RadioContainer.module.css";

const RadioContainer = ({children}) => {
  return (
    <div className={css["radio-container"]}>
      {children}
    </div>
  )
}

export default RadioContainer



// <div className={css.radioGroup}>
// <label className={css.radioLabel}>
//   <Field
//     type="radio"
//     name="gender"
//     value="woman"
//     className={css.radioInput}
//   />
//   <span className={css.radioMark}></span>
//   For woman
// </label>

// <label className={css.radioLabel}>
//   <Field
//     type="radio"
//     name="gender"
//     value="man"
//     className={css.radioInput}
//   />
//   <span className={css.radioMark}></span>
//   For man
// </label>
// </div>
