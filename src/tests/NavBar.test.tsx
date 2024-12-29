import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import NavBar from '../components/NavBar';

const renderNavBar = (
  activePage: 'home' | 'artists' | 'playlists' | 'profile'
) => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/home" element={<div>Home Page</div>} />
        <Route path="/artists" element={<div>Artists Page</div>} />
        <Route path="/playlists" element={<div>Playlists Page</div>} />
        <Route path="/profile" element={<div>Profile Page</div>} />
        <Route path="/" element={<NavBar activePage={activePage} />} />
      </Routes>
    </MemoryRouter>
  );
};

test('renders all navigation buttons', () => {
  renderNavBar('home');

  expect(screen.getByText('Home')).toBeInTheDocument();
  expect(screen.getByText('Artistas')).toBeInTheDocument();
  expect(screen.getByText('Playlists')).toBeInTheDocument();
  expect(screen.getByText('Perfil')).toBeInTheDocument();
});

test('highlights the active navigation item', () => {
  renderNavBar('playlists');

  const playlistsButton = screen.getByText('Playlists');
  expect(playlistsButton).toHaveStyle('color: #fff');

  expect(screen.getByText('Home')).not.toHaveStyle('color: #fff');
  expect(screen.getByText('Artistas')).not.toHaveStyle('color: #fff');
  expect(screen.getByText('Perfil')).not.toHaveStyle('color: #fff');
});

test('navigates to the correct page when a navigation button is clicked', () => {
  renderNavBar('home');

  fireEvent.click(screen.getByText('Playlists'));

  expect(screen.getByText('Playlists Page')).toBeInTheDocument();
});
