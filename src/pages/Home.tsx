import React, { useEffect } from 'react';
import NavBar from '../components/NavBar';

interface SpotifyAuthParams {
  access_token: string;
  expires_in: string;
  token_type: string;
}

const getReturnedParamsFromSpotifyAuth = (hash: string): SpotifyAuthParams => {
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

const Home: React.FC = () => {
  useEffect(() => {
    if (window.location.hash) {
      const { access_token, expires_in, token_type } =
        getReturnedParamsFromSpotifyAuth(window.location.hash);

      localStorage.clear();

      localStorage.setItem('accessToken', access_token);
      localStorage.setItem('tokenType', token_type);
      localStorage.setItem('expiresIn', expires_in);

      const currentUrl = window.location.href;
      const url = currentUrl.split('#')[0];
      history.pushState({}, '', url);
    }
  }, []);

  return (
    <div>
      <NavBar activePage="home" />
    </div>
  );
};

export default Home;
