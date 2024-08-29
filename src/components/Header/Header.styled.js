import styled from 'styled-components';

export const HeaderContainer = styled.header`
  &.container {
    padding-top: 8px;
    position: relative; //creates scroll and extra space below header, absolute makes logo and userlogo go through overlay
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
