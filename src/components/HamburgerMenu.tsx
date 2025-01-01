import React, { useState } from 'react';
import styled from 'styled-components';
import PWAButton from './PWAButton';
import NavButton from './NavButton';
import { IoMenu, IoClose } from 'react-icons/io5';
import SpotifyLogo from './SpotifyLogo';
import { useNavigate } from 'react-router-dom';

interface HamburgerTypes {
  activePage: string;
}

const Container = styled.div<{ open: boolean }>`
  cursor: pointer;
  z-index: 10;
  padding: 10px 24px;
  width: fit-content;
  height: fit-content;
  position: fixed;

  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    margin: auto;
  }

  svg {
    position: fixed;
    left: 24px;
  }
`;

const Menu = styled.nav<{ open: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #090707;
  height: 100vh;
  padding: 32px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-100%)')};
  transition: transform 0.3s ease-in-out;
  z-index: 9;
`;

const NavBarMainButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 41px;
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

const Hamburger: React.FC<HamburgerTypes> = ({ activePage }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <Container open={open}>
        {open ? (
          <IoClose size={40} onClick={() => setOpen(!open)} />
        ) : (
          <IoMenu size={40} onClick={() => setOpen(!open)} />
        )}
        <SpotifyLogo height="40px" />
      </Container>
      <Menu open={open}>
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
      </Menu>
    </>
  );
};

export default Hamburger;
