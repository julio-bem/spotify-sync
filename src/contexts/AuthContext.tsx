/// <reference types="vite/client" />
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  accessToken: string | null;
  tokenType: string | null;
  expiresIn: string | null;
  setAuthInfo: (authInfo: SpotifyAuthParams) => void;
}

interface SpotifyAuthParams {
  access_token: string | null;
  expires_in: string | null;
  token_type: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = `${window.location.origin}/home`;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem('accessToken')
  );
  const [tokenType, setTokenType] = useState<string | null>(
    localStorage.getItem('tokenType')
  );
  const [expiresIn, setExpiresIn] = useState<string | null>(
    localStorage.getItem('expiresIn')
  );

  const getToken = async (code: string) => {
    const codeVerifier = localStorage.getItem('code_verifier') || '';

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
        code_verifier: codeVerifier,
      }),
    });

    const data = await response.json();
    const { access_token, token_type, expires_in } = data;

    localStorage.setItem('accessToken', access_token);
    localStorage.setItem('tokenType', token_type);
    localStorage.setItem('expiresIn', expires_in);

    setAccessToken(access_token);
    setTokenType(token_type);
    setExpiresIn(expires_in);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      getToken(code);
    }
  }, []);

  const setAuthInfo = (authInfo: SpotifyAuthParams) => {
    const { access_token, token_type, expires_in } = authInfo;

    if (access_token) localStorage.setItem('accessToken', access_token);
    if (token_type) localStorage.setItem('tokenType', token_type);
    if (expires_in) localStorage.setItem('expiresIn', expires_in);

    setAccessToken(access_token);
    setTokenType(token_type);
    setExpiresIn(expires_in);
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, tokenType, expiresIn, setAuthInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
