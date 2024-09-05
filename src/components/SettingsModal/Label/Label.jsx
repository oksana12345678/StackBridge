import clsx from "clsx";
import css from "./Label.module.css";

const buildLabelClass = (type) => {
  switch (type) {
    case "thin":
      return "thin";
    case "thick":
      return "thick";
    default:
      return "default-class";
  }
};

const Label = ({ htmlFor, children, type }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={clsx(css.label, css[buildLabelClass(type)])}
    >
      {children}
    </label>
  );
};

export default Label;
