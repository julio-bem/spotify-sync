import React from 'react';
import OrdinaryButton from '../components/OrdinaryButton';
import OrdinaryText from '../components/OrdinaryText';
import SpotifyLogo from '../components/SpotifyLogo';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '../hooks/useMediaQuery';

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const SPOTIFY_AUTHORIZE_ENDPOINT = import.meta.env
  .VITE_SPOTIFY_AUTHORIZE_ENDPOINT;
const SCOPES = import.meta.env.VITE_SPOTIFY_SCOPES;
console.log('🚀 ~ SCOPES:', SCOPES);

const currentUrl = window.location.origin;
const REDIRECT_URL_AFTER_LOGIN = currentUrl.concat('/home');

const Login: React.FC = () => {
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const token = accessToken || localStorage.getItem('accessToken');
  const mediaQuery = useMediaQuery();
  console.log('🚀 ~ mediaQuery:', mediaQuery);

  const handleLogin = async () => {
    if (token) {
      navigate('/home');
    } else if (
      CLIENT_ID &&
      SPOTIFY_AUTHORIZE_ENDPOINT &&
      REDIRECT_URL_AFTER_LOGIN
    ) {
      const authUrl = new URL(SPOTIFY_AUTHORIZE_ENDPOINT);

      const generateRandomString = (length: number) => {
        const possible =
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const values = crypto.getRandomValues(new Uint8Array(length));
        return values.reduce(
          (acc, x) => acc + possible[x % possible.length],
          ''
        );
      };

      const codeVerifier = generateRandomString(64);

      const sha256 = async (plain: string) => {
        const encoder = new TextEncoder();
        const data = encoder.encode(plain);
        return window.crypto.subtle.digest('SHA-256', data);
      };

      const base64encode = (input: ArrayBuffer) => {
        return btoa(String.fromCharCode(...new Uint8Array(input)))
          .replace(/=/g, '')
          .replace(/\+/g, '-')
          .replace(/\//g, '_');
      };

      const hashed = await sha256(codeVerifier);
      const codeChallenge = base64encode(hashed);

      window.localStorage.setItem('code_verifier', codeVerifier);

      const params = {
        response_type: 'code',
        client_id: CLIENT_ID,
        scope: SCOPES,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
        redirect_uri: REDIRECT_URL_AFTER_LOGIN,
      };

      authUrl.search = new URLSearchParams(params).toString();
      window.location.href = authUrl.toString();
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

    @media (max-width: 767px) {
      padding: 0 20px;
      gap: 24px;
    }
  `;

  return (
    <LoginContainer>
      <SpotifyLogo width="164px" height="49.06px" />
      <OrdinaryText
        fontWeight="600"
        textAlign={mediaQuery === 'mobile' ? 'center' : 'left'}
      >
        Entra com sua conta Spotify clicando no botão abaixo
      </OrdinaryText>
      <OrdinaryButton
        width={mediaQuery === 'mobile' ? ' 150px' : '133px'}
        height="42px"
        onClick={handleLogin}
      >
        Entrar
      </OrdinaryButton>
    </LoginContainer>
  );
};

export default Login;
