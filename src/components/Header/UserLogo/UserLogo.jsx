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

// -якщо аватар присутній - ім'я юзера та його аватар, як контентне зображення, +

// -якщо автар відсутній - ім'я юзера та в якості аватару першу літеру імені юзера в апперкейсі,
// -якщо відсутні ім'я та аватар - першу літеру  email користувача.
// хедер
// fix the style

// my new email 9@gmail.com

export const UserLogo = () => {
  const userProfile = useSelector(selectUserEmail);
  const buttonNode = useRef();
  const dispatch = useDispatch();
  const isUserLogoModalOpen = useSelector(selectIsUserLogoModalOpen);
  const defaultUserImage = "/userPic.png";
  const defaultName = "User Name";

  const onClickOpenUserLogoModal = () => {
    dispatch(userLogoModal());
  };

  const name = userProfile.name;
  const userAvatar = userProfile.avatar;

  let logoContent;

  if (userAvatar && name) {
    logoContent = (
      <>
        <p className={css.name}>{name}</p>
        <img className={css.userAvatar} src={userAvatar} />
      </>
    );
  }

  if (!userAvatar && name) {
    logoContent = (
      <>
        <p className={css.name}>{name}</p>
        <p className={css.letter}>{name.slice(0, 1)}</p>
      </>
    );
  }

  if (!userAvatar && !name) {
    logoContent = <p>{useSelector(selectUserEmail).email.slice(0, 1)}</p>;
  }

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
