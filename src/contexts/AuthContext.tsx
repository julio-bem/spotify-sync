import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  accessToken: string | null;
  tokenType: string | null;
  expiresIn: string | null;
  setAuthInfo: (authInfo: SpotifyAuthParams) => void;
}

interface SpotifyAuthParams {
  access_token: string;
  expires_in: string;
  token_type: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getReturnedParamsFromSpotifyAuth = (hash: string) => {
  const stringAfterHashtag = hash.substring(1);
  const paramsInUrl = stringAfterHashtag.split('&');

  const paramsSplitUp = paramsInUrl.reduce(
    (accumulater: Record<string, string>, currentValue: string) => {
      const [key, value] = currentValue.split('=');
      accumulater[key] = value;
      return accumulater;
    },
    {} as Record<string, string>
  );

  return {
    access_token: paramsSplitUp['access_token'] ?? '',
    expires_in: paramsSplitUp['expires_in'] ?? '',
    token_type: paramsSplitUp['token_type'] ?? '',
  };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [tokenType, setTokenType] = useState<string | null>(null);
  const [expiresIn, setExpiresIn] = useState<string | null>(null);

  const setAuthInfo = (authInfo: SpotifyAuthParams) => {
    setAccessToken(authInfo.access_token);
    setTokenType(authInfo.token_type);
    setExpiresIn(authInfo.expires_in);
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const type = localStorage.getItem('tokenType');
    const expires = localStorage.getItem('expiresIn');

    if (token && type && expires) {
      setAccessToken(token);
      setTokenType(type);
      setExpiresIn(expires);
    }
  }, []);

  useEffect(() => {
    if (window.location.hash) {
      const { access_token, expires_in, token_type } =
        getReturnedParamsFromSpotifyAuth(window.location.hash);

      localStorage.clear();

      setAuthInfo({
        access_token,
        expires_in,
        token_type,
      });

      const currentUrl = window.location.href;
      const url = currentUrl.split('#')[0];
      history.pushState({}, '', url);
    }
  }, []);

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    }
    if (tokenType) {
      localStorage.setItem('tokenType', tokenType);
    }
    if (expiresIn) {
      localStorage.setItem('expiresIn', expiresIn);
    }
  }, [accessToken, tokenType, expiresIn]);

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
