import { useEffect, useRef, useState } from "react";
import css from "./UserLogoPopUp.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  closeModal,
  logOutModal,
  settingModal,
} from "../../../redux/modalWindow/slice";
import {
  selectIsUserLogoModalOpen,
  selectIsSettingModalOpen,
} from "../../../redux/modalWindow/selectors";
import { IoSettingsOutline, IoLogOutOutline } from "react-icons/io5";
import UserLogoutModal from "../../UserLogoutModal/UserLogoutModal";
import SettingModal from "../../SettingsModal/SettingModal";

const UserLogoPopUp = () => {
  const node = useRef();
  const dispatch = useDispatch();
  const [isClosing, setIsClosing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const isUserLogoModalOpen = useSelector(selectIsUserLogoModalOpen);
  const isSettingModalOpen = useSelector(selectIsSettingModalOpen);

  useEffect(() => {
    if (isUserLogoModalOpen) {
      setIsVisible(true);
      setTimeout(() => {
        setIsOpening(true);
      }, 100);
    }
  }, [isUserLogoModalOpen]);

  useEffect(() => {
    const handleCloseModal = () => {
      setIsClosing(true);
      setIsOpening(false);
      setTimeout(() => {
        setIsClosing(false);
        setIsVisible(false);
        dispatch(closeModal());
      }, 300);
    };

    const handleClickOutside = (event) => {
      if (node.current && !node.current.contains(event.target)) {
        handleCloseModal();
      }
    };
    if (isUserLogoModalOpen || isSettingModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserLogoModalOpen, isSettingModalOpen, dispatch]);

  return (
    <>
      {(isVisible || isClosing) && (
        <div
          className={`${css.backdrop} ${isOpening ? css.isOpen : ""} ${
            isClosing ? css.isClosing : ""
          }`}
          ref={node}
        >
          <ul className={css.list}>
            <li>
              <button
                className={css.LogoModalBtn}
                onClick={() => {
                  setIsVisible(false);
                  setIsClosing(false);
                  setIsOpening(false);
                  dispatch(settingModal());
                }}
              >
                <IoSettingsOutline className={css.icons} />
                Setting
              </button>
            </li>
            <li>
              <button
                className={css.LogoModalBtn}
                onClick={() => {
                  setIsVisible(false);
                  setIsClosing(false);
                  setIsOpening(false);
                  dispatch(logOutModal());
                }}
              >
                <IoLogOutOutline className={css.icons} />
                Log out
              </button>
            </li>
          </ul>
        </div>
      )}
      <UserLogoutModal />
      <SettingModal />
    </>
  );
};

export default UserLogoPopUp;
