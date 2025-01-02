import { useAuth } from '../contexts/AuthContext';

export const useRefreshToken = () => {
  const { setAccessToken, setRefreshToken } = useAuth();

  const getRefreshToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;

    const url = 'https://accounts.spotify.com/api/token';

    const payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken!,
        client_id: clientId,
      }),
    };

    const response = await fetch(url, payload);
    const data = await response.json();

    if (data.access_token) {
      localStorage.setItem('accessToken', data.access_token);
      setAccessToken(data.access_token);
    }

    if (data.refresh_token) {
      localStorage.setItem('refreshToken', data.refresh_token);
      setRefreshToken(data.refresh_token);
    }
  };

  return { getRefreshToken };
};
