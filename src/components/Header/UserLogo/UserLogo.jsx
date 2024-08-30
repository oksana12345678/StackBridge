import { useSelector } from "react-redux";
import css from "./UserLogo.module.css";
import { useDispatch } from "react-redux";
// import { selectUsers } from "../../../redux/service/user/getCurrentInfo/selectors";
import { userLogoModal } from "../../../redux/modalWindow/slice";
import { selectIsUserLogoModalOpen } from "../../../redux/modalWindow/selectors";
import UserLogoPopUp from "../UserLogoPopUp/UserLogoPopUp";
import { useRef } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

export const UserLogo = () => {
  // const userProfile = useSelector(selectUsers);
  const buttonNode = useRef();
  const dispatch = useDispatch();
  const isUserLogoModalOpen = useSelector(selectIsUserLogoModalOpen);
  const defaultUserImage = "https://avatar.iran.liara.run/public/6";

  const onClickOpenUserLogoModal = () => {
    dispatch(userLogoModal());
  };

  // const name = userProfile.name;
  // const email = userProfile.email;
  // const userAvatar = userProfile.avatar;
  // const enteredUserEmail = emailUsername(email);

  // function emailUsername(emailAddress) {
  //   return emailAddress.split("@")[0];
  // }

  // const makeUserName = () => {
  //   if (name) {
  //     return name;
  //   }
  //   if (!name && email) {
  //     return enteredUserEmail || "";
  //   } else {
  //     return "User Name";
  //   }
  // };

  return (
    <div onClick={onClickOpenUserLogoModal} ref={buttonNode}>
      <button className={css.button} aria-label="User Logo">
        {/* <p>{name ? name : makeUserName}</p> */}
        <p className={css.name}>david</p>

        <img className={css.userAvatar} src={defaultUserImage} />

        <div className={css.icon}>
          {isUserLogoModalOpen ? (
            <IoIosArrowUp className={css.icon} />
          ) : (
            <IoIosArrowDown className={css.icon} />
          )}
        </div>
      </button>

      {isUserLogoModalOpen && <UserLogoPopUp />}
    </div>
  );
};
