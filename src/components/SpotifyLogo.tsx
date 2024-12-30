import React from 'react';
import styled from 'styled-components';
import spotifyLogo from '../assets/images/spotify_logo.png';

interface LogoProps {
  onClick?: () => void;
  height?: string;
  width?: string;
}

const StyledSpotifyLogo = styled.img<LogoProps>`
  height: ${({ height }) => height || 'auto'};
  width: ${({ width }) => width || 'auto'};
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'auto')};
`;

const SpotifyLogo: React.FC<LogoProps> = ({ onClick, height, width }) => {
  return (
    <StyledSpotifyLogo
      src={spotifyLogo}
      alt="Logo do spotify"
      height={height}
      width={width}
      onClick={onClick}
    />
  );
};

export default SpotifyLogo;
