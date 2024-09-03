import React from "react";
import css from "./AuthFieldItems.module.css"
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { Field } from "formik";

export const EyeToggle =({ showPassword, setShowPassword }) => {
  return (
    <button
      type="button"
      className={css.eyebtn}
      width="44"
      height="44"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? (
        <HiOutlineEye size="20" className={css.eye} />
      ) : (
        <HiOutlineEyeOff size="20" className={css.eye} />
      )}
    </button>
  );
}

