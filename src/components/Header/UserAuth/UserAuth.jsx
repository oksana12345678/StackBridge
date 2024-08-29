import { RouterLink, HeaderIcon } from './UserAuth.styled';
import user from '../../../Icons/user_outline.svg';

export const UserAuth = () => (
  <RouterLink to="/login">
    Sign in
    <HeaderIcon>
      <svg>
        <use href={user + '#icon-outline'}></use>
      </svg>
    </HeaderIcon>
  </RouterLink>
);
