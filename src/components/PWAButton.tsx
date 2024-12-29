import React from 'react';
import styled from 'styled-components';
import PWAIcon from '../assets/icons/pwa-icon.svg?react';

interface PWAButtonProps {
  onClick: () => void;
}

const PWAButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 26px;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  transition: transform 0.1s ease;
  margin-top: auto;

  &:hover {
    transform: scale(1.02);
    transition: transform 0.3s ease;
  }
`;

const StyledIcon = styled(PWAIcon as React.FC<React.SVGProps<SVGSVGElement>>)`
  width: 24px;
  height: 24px;
`;

const Text = styled.p`
  font-size: 19px;
  font-weight: 700;
  line-height: 13.74px;
`;

const PWAButton: React.FC<PWAButtonProps> = ({ onClick }) => {
  return (
    <PWAButtonContainer onClick={onClick}>
      <StyledIcon />
      <Text>Instalar PWA</Text>
    </PWAButtonContainer>
  );
};

export default PWAButton;
