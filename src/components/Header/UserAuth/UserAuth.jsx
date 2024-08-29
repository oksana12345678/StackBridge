import css from "./UserAuth.module.css";
import user from "../../../Icons/user_outline.svg";
import { Link } from "react-router-dom";

export const UserAuth = () => (
  <Link className={css.link} to="/login">
    Sign in
    <svg>
      <use href={user + "#icon-outline"}></use>
    </svg>
  </Link>
);
