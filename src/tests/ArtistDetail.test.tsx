import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, Mock } from 'vitest';
import ArtistDetail from '../pages/ArtistDetail';
import { MemoryRouter } from 'react-router-dom';
import { useArtist } from '../contexts/ArtistContext';
import { AuthProvider } from '../contexts/AuthContext';

global.fetch = vi.fn().mockResolvedValue({
  ok: true,
  json: () =>
    Promise.resolve({
      items: [
        {
          id: '1',
          name: 'Album 1',
          release_date: '2023-01-01',
          external_urls: { spotify: 'http://spotify.com/album/1' },
          images: [{ url: 'http://example.com/album1.jpg' }],
        },
        {
          id: '2',
          name: 'Album 2',
          release_date: '2023-02-01',
          external_urls: { spotify: 'http://spotify.com/album/2' },
          images: [{ url: 'http://example.com/album2.jpg' }],
        },
      ],
      total: 10,
    }),
});

vi.mock('../contexts/ArtistContext', () => ({
  ...vi.importActual('../contexts/ArtistContext'),
  useArtist: vi.fn(),
}));

describe('ArtistDetail Page', () => {
  it('should render the loading state initially', async () => {
    (useArtist as Mock).mockReturnValue({
      artist: {
        id: '123',
        name: 'Artist Mocked',
        profilePic: 'http://example.com/profile.jpg',
      },
      setArtist: vi.fn(),
    });

    render(
      <MemoryRouter>
        <AuthProvider>
          <ArtistDetail />
        </AuthProvider>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText('Carregando...')).toBeInTheDocument()
    );
  });

  it('should display artist details and albums after loading', async () => {
    (useArtist as Mock).mockReturnValue({
      artist: {
        id: '123',
        name: 'Artist Mocked',
        profilePic: 'http://example.com/profile.jpg',
      },
      setArtist: vi.fn(),
    });

    render(
      <MemoryRouter>
        <AuthProvider>
          <ArtistDetail />
        </AuthProvider>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText('Album 1')).toBeInTheDocument()
    );
    expect(screen.getByText('Album 2')).toBeInTheDocument();
  });
});
