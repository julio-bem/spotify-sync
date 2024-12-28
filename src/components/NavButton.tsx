import React from 'react';
import styled from 'styled-components';
import DiscIcon from '../assets/icons/disc-icon.svg?react';
import HomeIcon from '../assets/icons/home-icon.svg?react';
import PlayIcon from '../assets/icons/play-icon.svg?react';
import UserIcon from '../assets/icons/user-icon.svg?react';

interface NavButtonProps {
  variant: 'home' | 'artists' | 'playlists' | 'profile';
  onClick: () => void;
  isActive: boolean;
  children?: React.ReactNode;
}

interface IconProps {
  isActive: boolean;
  variant: 'home' | 'artists' | 'playlists' | 'profile';
}

const NavButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  transition: transform 0.1s ease;
  padding: 12px 0;

  &:hover {
    transform: scale(1.06);
    transition: transform 0.3s ease;
  }
`;

const NavButton: React.FC<NavButtonProps> = ({
  variant,
  isActive,
  onClick,
  children,
}) => {
  const getCurrentIcon = (
    variant: 'home' | 'artists' | 'playlists' | 'profile'
  ) => {
    switch (variant) {
      case 'home':
        return HomeIcon;
      case 'artists':
        return DiscIcon;
      case 'playlists':
        return PlayIcon;
      case 'profile':
        return UserIcon;
      default:
        return null;
    }
  };

  const CurrentIcon = getCurrentIcon(variant);

  const StyledIcon = styled(
    CurrentIcon as React.FC<React.SVGProps<SVGSVGElement> & IconProps>
  )`
    width: 24px;
    height: 24px;
    stroke: ${({ isActive, variant }) =>
      variant !== 'home' ? (isActive ? '#fff' : '#949EA2') : ''};
    fill: ${({ isActive, variant }) =>
      variant === 'home' ? (isActive ? '#fff' : '#949EA2') : ''};
  `;

  return (
    <NavButtonContainer onClick={onClick}>
      <StyledIcon isActive={isActive} variant={variant} />
      <p>{children}</p>
    </NavButtonContainer>
  );
};

export default NavButton;
