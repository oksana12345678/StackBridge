import { Link } from "react-router-dom";
import css from "./HeaderLogo.module.css";
import logo from "../../../Images/Logo.svg";

export const HeaderLogo = () => (
  <div className={css.logo}>
    <Link to={"/"}>
      <img src={logo} alt="Logo" />
    </Link>
  </div>
);
