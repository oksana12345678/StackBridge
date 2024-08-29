import { useSelector } from "react-redux";
import css from "./UserLogo.module.css";

import { useDispatch } from "react-redux";
import arrow from "../../../Icons/solid.svg";
import arrowup from "../../../Icons/arrow-up.svg";
// import { SettingModal } from "../../AllModals/SettingModal/SettingModal";
// import { UserLogoutModal } from "../../AllModals/UserLogoutModal/UserLogoutModal";

// import { selectUsers } from "../../../redux/service/user/getCurrentInfo/selectors";
import { userLogoModal } from "../../../redux/modalWindow/slice";
import { selectIsUserLogoModalOpen } from "../../../redux/modalWindow/selectors";
import UserLogoPopUp from "../UserLogoPopUp/UserLogoPopUp";

export const UserLogo = () => {
  // const userProfile = useSelector(selectUsers);
  const dispatch = useDispatch();
  const isUserLogoModalOpen = useSelector(selectIsUserLogoModalOpen);

  // const name = userProfile.name;
  // const email = userProfile.email;
  // const userAvatar = userProfile.avatar;
  // const enteredUserEmail = emailUsername(email);
  const defaultUserImage = "https://avatar.iran.liara.run/public/6";

  const onClickOpenUserLogoModal = () => {
    dispatch(userLogoModal());
  };

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
    <div onClick={onClickOpenUserLogoModal} className={css.open}>
      <button className={css.button} aria-label="User Logo">
        <p>david</p>

        <img className={css.userAvatar} src={defaultUserImage} />

        <svg className={css.icon}>
          {isUserLogoModalOpen ? (
            <use href={arrowup + "#icon-arrow-up"}></use>
          ) : (
            <use href={arrow + "#icon-arrow-down"}></use>
          )}
        </svg>
      </button>

      {isUserLogoModalOpen && (
        <UserLogoPopUp isModalOpen={isUserLogoModalOpen} />
      )}
    </div>
  );
};
