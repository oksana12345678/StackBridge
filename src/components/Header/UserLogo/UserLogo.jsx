import { useSelector } from "react-redux";
import css from "./UserLogo.module.css";
import { useDispatch } from "react-redux";
import { userLogoModal } from "../../../redux/modalWindow/slice";
import { selectIsUserLogoModalOpen } from "../../../redux/modalWindow/selectors";
import UserLogoPopUp from "../UserLogoPopUp/UserLogoPopUp";
import { useRef } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { selectUserEmail } from "../../../redux/auth/selectors";

export const UserLogo = () => {
  const userProfile = useSelector(selectUserEmail);
  const buttonNode = useRef();
  const dispatch = useDispatch();
  const isUserLogoModalOpen = useSelector(selectIsUserLogoModalOpen);
  const defaultUserImage = "../../../../public/userPic.png";
  const defaultName = "User Name";

  const onClickOpenUserLogoModal = () => {
    dispatch(userLogoModal());
  };

  const name = userProfile.name;
  const userAvatar = userProfile.avatar;

  return (
    <div onClick={onClickOpenUserLogoModal} ref={buttonNode}>
      <button className={css.button} aria-label="User Logo">
        <p className={css.name}>{name ? name : defaultName}</p>

        <img
          className={css.userAvatar}
          src={userAvatar ? userAvatar : defaultUserImage}
        />

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
