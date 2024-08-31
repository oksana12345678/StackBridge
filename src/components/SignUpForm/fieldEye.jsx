import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

import css from "./SignUpForm.module.css";
// import css from ".";

export default function fieldEye() {
  return (
    <div className={css.friendItem}>
      <svg className={css.icon} width="18" height="24">
        <use href="../../Images/signIn-signUp/bottle/mobile/bottle_mobile@1x.png"></use>
      </svg>
    </div>
  );
}

{
  /* <FiEye />; open eye*/
}
