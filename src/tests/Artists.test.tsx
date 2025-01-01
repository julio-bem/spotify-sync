import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import Artists from '../pages/Artists';
import { MemoryRouter } from 'react-router-dom';
import { ArtistProvider } from '../contexts/ArtistContext';

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
          name: 'Artist 1',
          images: [{ url: 'http://example.com/artist1.jpg' }],
        },
        {
          id: '2',
          name: 'Artist 2',
          images: [{ url: 'http://example.com/artist2.jpg' }],
        },
        {
          id: '3',
          name: 'Artist 3',
          images: [{ url: 'http://example.com/artist3.jpg' }],
        },
        {
          id: '4',
          name: 'Artist 4',
          images: [{ url: 'http://example.com/artist4.jpg' }],
        },
        {
          id: '5',
          name: 'Artist 5',
          images: [{ url: 'http://example.com/artist5.jpg' }],
        },
      ],
      total: 10,
    }),
});

describe('Artists Page', () => {
  it('should render the loading state initially', () => {
    render(
      <MemoryRouter>
        <ArtistProvider>
          <Artists />
        </ArtistProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('Carregando...')).toBeInTheDocument();
  });

  it('should display a list of top artists after loading', async () => {
    render(
      <MemoryRouter>
        <ArtistProvider>
          <Artists />
        </ArtistProvider>
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText(/Artist 1/));

    expect(screen.getByText(/Artist 1/)).toBeInTheDocument();
    expect(screen.getByText(/Artist 2/)).toBeInTheDocument();
    expect(screen.getByText(/Artist 3/)).toBeInTheDocument();
    expect(screen.getByText(/Artist 4/)).toBeInTheDocument();
    expect(screen.getByText(/Artist 5/)).toBeInTheDocument();
  });

  it('should change the page when clicking the pagination', async () => {
    render(
      <MemoryRouter>
        <ArtistProvider>
          <Artists />
        </ArtistProvider>
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText(/Artist 1/));

    const nextPageButton = screen.getByText('Próximo');
    fireEvent.click(nextPageButton);

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.spotify.com/v1/me/top/artists?limit=5&offset=5&time_range=medium_term',
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
        <ArtistProvider>
          <Artists />
        </ArtistProvider>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(global.window.location.href).toBe('http://localhost:3000/')
    );
  });
});
