import css from "./UserAuth.module.css";
import { NavLink } from "react-router-dom";
import { RxPerson } from "react-icons/rx";

export const UserAuth = () => (
  <NavLink className={css.link} to="/signin">
    Sign in
    <div className={css.iconContainer}>
      <RxPerson className={css.icon} />
    </div>
  </NavLink>
);
