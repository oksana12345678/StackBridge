import clsx from "clsx";
import { buildInputClass } from "./buildInputClass";
import css from "./Input.module.css";

const Input = ({ type, placeholder, styleType }) => {
  return (
    <input
      className={clsx(css.input, css[buildInputClass(styleType)])}
      type={type}
      placeholder={placeholder}
    />
  );
};

export default Input;
