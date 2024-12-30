import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { test, vi, expect } from 'vitest';
import Login from '../pages/Login';

// .ENV MOCK
vi.stubEnv('VITE_SPOTIFY_CLIENT_ID', '938746d8967a4b4e874a7480cb92ad10');
vi.stubEnv(
  'VITE_SPOTIFY_AUTHORIZE_ENDPOINT',
  'https://accounts.spotify.com/authorize'
);
vi.stubEnv('VITE_SPOTIFY_REDIRECT_URL', 'http://localhost:3000/home');
vi.stubEnv(
  'VITE_SPOTIFY_SCOPES',
  'user-read-currently-playing user-read-playback-state user-read-private user-read-email user-top-read playlist-read-private playlist-modify-public playlist-modify-private'
);

test('should render the login button and redirect to Spotify authorization on click', () => {
  const mockLocation = { href: '' };
  global.window.location = mockLocation as Location;

  render(<Login />);

  const loginButton = screen.getByRole('button', { name: /Entrar/i });
  expect(loginButton).toBeInTheDocument();

  fireEvent.click(loginButton);

  expect(mockLocation.href).toBe(
    'https://accounts.spotify.com/authorize?client_id=938746d8967a4b4e874a7480cb92ad10&redirect_uri=http://localhost:3000/home&scope=user-read-currently-playing%20user-read-playback-state%20user-read-private%20user-read-email%20user-top-read%20playlist-read-private%20playlist-modify-public%20playlist-modify-private&response_type=token&show_dialog=true'
  );
});
