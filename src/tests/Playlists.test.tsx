import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import Playlists from '../pages/Playlists';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({
    accessToken: 'mock-access-token',
  }),
}));

global.fetch = vi.fn().mockResolvedValue({
  ok: true,
  json: () =>
    Promise.resolve({
      items: [
        {
          id: '1',
          name: 'Playlist 1',
          images: [{ url: 'http://example.com/playlist1.jpg' }],
          external_urls: { spotify: 'http://spotify.com/playlist/1' },
          owner: { display_name: 'Owner 1', id: 'owner1' },
        },
        {
          id: '2',
          name: 'Playlist 2',
          images: [{ url: 'http://example.com/playlist2.jpg' }],
          external_urls: { spotify: 'http://spotify.com/playlist/2' },
          owner: { display_name: 'Owner 2', id: 'owner2' },
        },
      ],
      total: 10,
    }),
});

describe('Playlists Page', () => {
  it('should render the loading state initially', () => {
    render(
      <MemoryRouter>
        <Playlists />
      </MemoryRouter>
    );

    expect(screen.getByText('Carregando...')).toBeInTheDocument();
  });

  it('should display a list of playlists after loading', async () => {
    render(
      <MemoryRouter>
        <Playlists />
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText(/Playlist 1/));

    expect(screen.getByText(/Playlist 1/)).toBeInTheDocument();
    expect(screen.getByText(/Playlist 2/)).toBeInTheDocument();
  });

  it('should show the modal when clicking "Criar playlist"', () => {
    render(
      <MemoryRouter>
        <Playlists />
      </MemoryRouter>
    );

    const createButton = screen.getByText('Criar playlist');
    fireEvent.click(createButton);

    expect(screen.getByText('Criar playlist')).toBeInTheDocument();
  });

  it('should close the modal when clicking close', () => {
    render(
      <MemoryRouter>
        <Playlists />
      </MemoryRouter>
    );

    const createButton = screen.getByText('Criar playlist');
    fireEvent.click(createButton);

    const closeButton = screen
      .getByTestId('modal-container')
      .querySelector('svg');
    fireEvent.click(closeButton!);

    expect(
      screen.queryByText('Dê um nome a sua playlist')
    ).not.toBeInTheDocument();
  });

  it('should change the page when clicking the pagination', async () => {
    render(
      <MemoryRouter>
        <Playlists />
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText(/Playlist 1/));

    const nextPageButton = screen.getByText('Próximo');
    fireEvent.click(nextPageButton);

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.spotify.com/v1/me/playlists?limit=5&offset=5',
      expect.objectContaining({
        headers: {
          Authorization: 'Bearer mock-access-token',
        },
      })
    );
  });

  it('should redirect to home if the user is unauthorized', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 401,
    });

    render(
      <MemoryRouter>
        <Playlists />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(global.window.location.href).toBe('http://localhost:3000/')
    );
  });
});
