import css from "./UserAuth.module.css";
import user from "../../../Icons/Vector.svg";
import { NavLink } from "react-router-dom";

export const UserAuth = () => (
  <NavLink className={css.link} to="/signin">
    Sign in
    <div className={css.iconContainer}>
      <svg className={css.icon}>
        <use href={user + "#Vector"} />
      </svg>
    </div>
  </NavLink>
);
