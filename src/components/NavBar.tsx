import React from 'react';
import styled from 'styled-components';
import NavButton from './NavButton';
import SpotifyLogo from './SpotifyLogo';
import { useNavigate } from 'react-router-dom';
import PWAButton from './PWAButton';
import useMediaQuery from '../hooks/useMediaQuery';
import Hamburger from './HamburgerMenu';

interface NavBarProps {
  activePage: 'home' | 'artists' | 'playlists' | 'profile';
}

const NavBar: React.FC<NavBarProps> = ({ activePage }) => {
  const navigate = useNavigate();
  const mediaType = useMediaQuery();

  const NavBarContainer = styled.div`
    background-color: #000;
    height: 100vh;
    width: 250px;
    min-width: 250px;
    padding: 31.04px 30px 14px;
    display: flex;
    flex-direction: column;
  `;

  const NavBarMainButtonsContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 31px;
  `;

  const navItems: {
    variant: 'home' | 'artists' | 'playlists' | 'profile';
    label: string;
    path: string;
  }[] = [
    { variant: 'home', label: 'Home', path: '/home' },
    {
      variant: 'artists',
      label: 'Artistas',
      path: '/artists',
    },
    {
      variant: 'playlists',
      label: 'Playlists',
      path: '/playlists',
    },
    { variant: 'profile', label: 'Perfil', path: '/profile' },
  ];

  if (mediaType === 'mobile') return <Hamburger activePage={activePage} />;

  return (
    <NavBarContainer>
      <SpotifyLogo
        onClick={() => navigate('/home')}
        width="164px"
        height="49.06px"
      />
      <NavBarMainButtonsContainer>
        {navItems.map((item) => (
          <NavButton
            key={item.variant}
            variant={item.variant}
            isActive={activePage === item.variant}
            onClick={() => navigate(item.path)}
          >
            {item.label}
          </NavButton>
        ))}
      </NavBarMainButtonsContainer>
      <PWAButton />
    </NavBarContainer>
  );
};

export default NavBar;
