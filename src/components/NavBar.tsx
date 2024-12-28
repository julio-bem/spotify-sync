import React from 'react';
import styled from 'styled-components';
import NavButton from './NavButton';
import SpotifyLogo from './SpotifyLogo';

const NavBar = () => {
  const NavBarContainer = styled.div`
    background-color: #000;
    height: 100vh;
    width: 250px;
    padding: 31.04px 30px 14px;
  `;

  const NavBarMainButtonsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-top: 43px;
  `;

  return (
    <NavBarContainer>
      <SpotifyLogo width="164px" height="49.06px" />
      <NavBarMainButtonsContainer>
        <NavButton />
        <NavButton />
        <NavButton />
      </NavBarMainButtonsContainer>
    </NavBarContainer>
  );
};

export default NavBar;
