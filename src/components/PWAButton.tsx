/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
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

const PWAButton: React.FC<PWAButtonProps> = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        console.log(choiceResult.outcome);
        setDeferredPrompt(null);
      });
    } else {
      console.log('O PWA não está pronto para instalação.');
    }
  };

  return (
    <PWAButtonContainer onClick={handleInstallClick}>
      <StyledIcon />
      <Text>Instalar PWA</Text>
    </PWAButtonContainer>
  );
};

export default PWAButton;
