import React from 'react';
import OrdinaryButton from '../components/OrdinaryButton';
import OrdinaryText from '../components/OrdinaryText';
import SpotifyLogo from '../components/SpotifyLogo';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const SPOTIFY_AUTHORIZE_ENDPOINT = import.meta.env
  .VITE_SPOTIFY_AUTHORIZE_ENDPOINT;
const SCOPES = import.meta.env.VITE_SPOTIFY_SCOPES?.split(' ') || [];
const SPACE_DELIMITER = '%20';
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

const currentUrl = window.location.origin;
const REDIRECT_URL_AFTER_LOGIN = currentUrl.concat('/home');

const Login: React.FC = () => {
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const token = accessToken || localStorage.getItem('accessToken');
  console.log('🚀 ~ token:', token);

  const handleLogin = () => {
    if (token) {
      navigate('/home');
    } else if (
      CLIENT_ID &&
      SPOTIFY_AUTHORIZE_ENDPOINT &&
      REDIRECT_URL_AFTER_LOGIN
    ) {
      window.location.href = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
    } else {
      console.error('Missing Spotify configuration.');
    }
  };

  const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
    height: 100vh;
    width: 100vw;
  `;

  return (
    <LoginContainer>
      <SpotifyLogo width="164px" height="49.06px" />
      <OrdinaryText fontWeight="600">
        Entra com sua conta Spotify clicando no botão abaixo
      </OrdinaryText>
      <OrdinaryButton width="133px" height="42px" onClick={handleLogin}>
        Entrar
      </OrdinaryButton>
    </LoginContainer>
  );
};

export default Login;
