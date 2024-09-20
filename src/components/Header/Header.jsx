import { useSelector } from "react-redux";
import css from "./Header.module.css";
import { HeaderLogo } from "./HeaderLogo/HeaderLogo";
import { UserAuth } from "./UserAuth/UserAuth";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { UserLogo } from "./UserLogo/UserLogo";

const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <header className={css.header}>
      <div className={css.container}>
        <HeaderLogo />
        {isLoggedIn ? <UserLogo /> : <UserAuth />}
      </div>
    </header>
  );
};
export default Header;
