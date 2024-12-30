/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PWAIcon from '../assets/icons/pwa-icon.svg?react';

interface PWAButtonProps {
  onClick: () => void;
}

const PWAButtonContainer = styled.button`
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
    // Detectando o evento 'beforeinstallprompt'
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault(); // Impede o navegador de exibir o prompt automaticamente
      setDeferredPrompt(e); // Armazena o evento para exibição posterior
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
      // Exibe o prompt de instalação
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        console.log(choiceResult.outcome); // Registra a escolha do usuário (aceitar ou cancelar)
        setDeferredPrompt(null); // Limpa o evento após a escolha
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
