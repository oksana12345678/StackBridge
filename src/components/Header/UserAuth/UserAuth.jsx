import css from "./UserAuth.module.css";
import user from "../../../Icons/user_outline.svg";
import { NavLink } from "react-router-dom";

export const UserAuth = () => (
  <NavLink className={css.link} to="/signin">
    Sign in
    <svg>
      <use href={user + "#icon-outline"}></use>
    </svg>
  </NavLink>
);
