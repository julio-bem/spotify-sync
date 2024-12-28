import React from 'react';
import OrdinaryButton from '../components/OrdinaryButton';
import OrdinaryText from '../components/OrdinaryText';
import SpotifyLogo from '../components/SpotifyLogo';
import styled from 'styled-components';

const Login: React.FC = () => {
  const handleLogin = () => {
    const clientId = 'YOUR_SPOTIFY_CLIENT_ID';
    const redirectUri = 'http://localhost:3000/';
    const scopes = [
      'user-read-private',
      'user-read-email',
      'user-top-read',
      'playlist-read-private',
      'playlist-modify-private',
    ].join(' ');

    const authUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&scope=${scopes}&redirect_uri=${redirectUri}`;

    window.location.href = authUrl;
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
