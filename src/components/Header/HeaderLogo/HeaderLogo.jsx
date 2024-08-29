import { Link } from 'react-router-dom';
import { ContainerOfLogo } from './HeaderLogo.styled';
import logo from '../../../Images/Logo.svg';

export const HeaderLogo = () => (
  <ContainerOfLogo>
    <Link to={'/'}>
      <img src={logo} alt="Logo" />
    </Link>
  </ContainerOfLogo>
);
