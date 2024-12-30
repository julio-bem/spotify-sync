import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, Mock } from 'vitest';
import Profile from '../pages/Profile';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';

global.fetch = vi.fn();

describe('Profile Page', () => {
  it('should render the loading state initially', async () => {
    (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          id: 'user123',
          display_name: 'Test User',
          images: [{ url: 'http://example.com/avatar.jpg' }],
        }),
    });

    render(
      <MemoryRouter>
        <AuthProvider>
          <Profile />
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('Carregando...')).toBeInTheDocument();
  });

  it('should display user profile data after loading', async () => {
    (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          id: 'user123',
          display_name: 'Test User',
          images: [{ url: 'http://example.com/avatar.jpg' }],
        }),
    });

    render(
      <MemoryRouter>
        <AuthProvider>
          <Profile />
        </AuthProvider>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText('Test User')).toBeInTheDocument()
    );
  });

  it('should display error message if fetching profile fails', async () => {
    (fetch as Mock).mockResolvedValueOnce({
      ok: false,
      statusText: 'Not Found',
    });

    render(
      <MemoryRouter>
        <AuthProvider>
          <Profile />
        </AuthProvider>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText('Erro ao obter dados')).toBeInTheDocument()
    );
  });

  it('should handle logout correctly', async () => {
    (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          id: 'user123',
          display_name: 'Test User',
          images: [{ url: 'http://example.com/avatar.jpg' }],
        }),
    });

    render(
      <MemoryRouter>
        <AuthProvider>
          <Profile />
        </AuthProvider>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText('Test User')).toBeInTheDocument()
    );

    const logoutButton = screen.getByText('Sair');
    fireEvent.click(logoutButton);

    expect(localStorage.getItem('accessToken')).toBeNull();
    expect(localStorage.getItem('tokenType')).toBeNull();
    expect(localStorage.getItem('expiresIn')).toBeNull();
  });
});
