import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";
import css from "./UserLogo.module.css";
import { userLogoModal } from "../../../redux/modalWindow/slice";
import { selectIsUserLogoModalOpen } from "../../../redux/modalWindow/selectors";
import UserLogoPopUp from "../UserLogoPopUp/UserLogoPopUp";
import { useRef } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { selectUserEmail } from "../../../redux/auth/selectors";

export const UserLogo = () => {
  const userProfile = useSelector(selectUserEmail);
  const buttonNode = useRef();
  const dispatch = useDispatch();
  const isUserLogoModalOpen = useSelector(selectIsUserLogoModalOpen);

  const name = userProfile?.name || "";
  const userAvatar = userProfile?.avatar;
  const email = userProfile?.email || "u";
  const firstLetter = name
    ? name.charAt(0).toUpperCase()
    : email.charAt(0).toUpperCase();

  const onClickOpenUserLogoModal = () => {
    dispatch(userLogoModal());
  };

  const logoContent = userAvatar ? (
    <>
      <p className={css.name}>{name}</p>
      <img className={css.userAvatar} src={userAvatar} alt="User Avatar" />
    </>
  ) : (
    <>
      {name && <p className={css.name}>{name}</p>}
      <p className={clsx(css.name, css["letter"])}>{firstLetter}</p>
    </>
  );

  return (
    <div ref={buttonNode}>
      <button
        className={css.button}
        aria-label="User Logo"
        onClick={onClickOpenUserLogoModal}
      >
        {logoContent}
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
