import styled from 'styled-components';

export const UserLogoContainer = styled.div`
  position: relative;
`;

export const UserLogoBtn = styled.button`
  border: none;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: transparent;
`;

export const UserName = styled.div`
  margin-right: 8px;
  font-size: 16px;
`;

export const UserLogoIcon = styled.svg`
  width: 16px;
  height: 16px;
  fill: #407bff;
`;

export const HeaderIcon = styled.svg`
  margin-right: 6px;
  width: 28px;
  height: 28px;
  fill: #ffffff;
  stroke: #2f2f2f;
`;

export const UserAvatar = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  margin-right: 4px;
`;
