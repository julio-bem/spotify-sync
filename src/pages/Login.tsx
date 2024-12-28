import React from 'react';
import OrdinaryButton from '../components/OrdinaryButton';
import OrdinaryText from '../components/OrdinaryText';
import SpotifyLogo from '../components/SpotifyLogo';
import styled from 'styled-components';

const CLIENT_ID = '938746d8967a4b4e874a7480cb92ad10';
const SPOTIFY_AUTHORIZE_ENDPOINT = 'https://accounts.spotify.com/authorize';
const REDIRECT_URL_AFTER_LOGIN = 'http://localhost:3000/home';
const SPACE_DELIMITER = '%20';
const SCOPES = [
  'user-read-currently-playing',
  'user-read-playback-state',
  'user-read-private',
  'user-read-email',
  'user-top-read',
  'playlist-read-private',
  'playlist-modify-private',
];
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

const Login: React.FC = () => {
  const handleLogin = () => {
    window.location.href = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
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
