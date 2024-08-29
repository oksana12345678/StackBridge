import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectUserProfile } from '../../../redux/auth/authSelectors';
import {
  UserName,
  UserLogoBtn,
  UserLogoIcon,
  UserLogoContainer,
  UserAvatar,
} from './UserLogo.styled';
import arrow from '../../../Icons/solid.svg';
import arrowup from '../../../Icons/arrow-up.svg';
import { UserLogoPopUp } from '../../AllModals/UserLogoModal/UserLogoPopUp';
import { SettingModal } from '../../AllModals/SettingModal/SettingModal';
import { UserLogoutModal } from '../../AllModals/UserLogoutModal/UserLogoutModal';

export const UserLogo = () => {
  const userProfile = useSelector(selectUserProfile);
  const name = userProfile.name;
  const email = userProfile.email;
  const userAvatar = userProfile.avatarURL;
  const enteredUserEmail = emailUsername(email);
  const avatarURL = `https://water-tracker-backend-ob6w.onrender.com/${userAvatar}`;
  const defaultUserImage = 'https://avatar.iran.liara.run/public/6';
  const [isUserLogoModalOpen, setIsUserLogoModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutOpen] = useState(false);
  const headerNode = useRef();

  const onClickUserLogo = (e) => {
    if (e.currentTarget.classList.contains('open')) {
      setIsUserLogoModalOpen(false);
      return;
    }
    setIsUserLogoModalOpen(true);
  };

  function emailUsername(emailAddress) {
    return emailAddress.split('@')[0];
  }

  const makeUserName = () => {
    if (name) {
      return name;
    }
    if (!name && email) {
      return enteredUserEmail || '';
    } else {
      return 'User Name';
    }
  };

  return (
    <UserLogoContainer
      onClick={onClickUserLogo}
      className={isUserLogoModalOpen && 'open'}
      ref={headerNode}
    >
      <UserLogoBtn aria-label="User Logo">
        <UserName>
          {userProfile.name ? userProfile.name : makeUserName()}
        </UserName>

        <UserAvatar src={userAvatar ? avatarURL : defaultUserImage} />

        <UserLogoIcon>
          {isUserLogoModalOpen ? (
            <use href={arrowup + '#icon-arrow-up'}></use>
          ) : (
            <use href={arrow + '#icon-arrow-down'}></use>
          )}
        </UserLogoIcon>
      </UserLogoBtn>

      {isUserLogoModalOpen && (
        <UserLogoPopUp
          setIsUserLogoModalOpen={setIsUserLogoModalOpen}
          headerNode={headerNode.current}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          setIsLogoutOpen={setIsLogoutOpen}
        />
      )}
      <SettingModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      />
      <UserLogoutModal
        isOpen={isLogoutModalOpen}
        onRequestClose={() => setIsLogoutOpen(false)}
      />
    </UserLogoContainer>
  );
};
