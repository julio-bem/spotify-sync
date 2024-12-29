import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import CreatePlaylistModal from '../components/CreatePlaylistModal';

vi.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({
    accessToken: 'token-fake',
  }),
}));

test('renders modal when isVisible is true', () => {
  const mockOnClose = vi.fn();
  const mockFetchPlaylists = vi.fn();

  render(
    <CreatePlaylistModal
      isVisible={true}
      onClose={mockOnClose}
      setIsModalVisible={vi.fn()}
      currentPage={1}
      fetchPlaylists={mockFetchPlaylists}
      userId="user123"
    />
  );

  expect(screen.getByText('Dê um nome a sua playlist')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Nome da playlist')).toBeInTheDocument();
  expect(screen.getByText('Criar')).toBeInTheDocument();
});

test('does not render modal when isVisible is false', () => {
  const mockOnClose = vi.fn();
  const mockFetchPlaylists = vi.fn();

  const { container } = render(
    <CreatePlaylistModal
      isVisible={false}
      onClose={mockOnClose}
      setIsModalVisible={vi.fn()}
      currentPage={1}
      fetchPlaylists={mockFetchPlaylists}
      userId="user123"
    />
  );

  expect(container).toBeEmptyDOMElement();
});

test('calls onClose when clicking outside the modal', () => {
  const mockOnClose = vi.fn();
  const mockFetchPlaylists = vi.fn();

  render(
    <CreatePlaylistModal
      isVisible={true}
      onClose={mockOnClose}
      setIsModalVisible={vi.fn()}
      currentPage={1}
      fetchPlaylists={mockFetchPlaylists}
      userId="user123"
    />
  );

  fireEvent.click(screen.getByTestId('modal-overlay'));
  expect(mockOnClose).toHaveBeenCalled();
});

test('does not call onClose when clicking inside the modal', () => {
  const mockOnClose = vi.fn();
  const mockFetchPlaylists = vi.fn();

  render(
    <CreatePlaylistModal
      isVisible={true}
      onClose={mockOnClose}
      setIsModalVisible={vi.fn()}
      currentPage={1}
      fetchPlaylists={mockFetchPlaylists}
      userId="user123"
    />
  );

  fireEvent.click(screen.getByTestId('modal-container'));
  expect(mockOnClose).not.toHaveBeenCalled();
});

test('calls handleCreate when clicking the create button', async () => {
  const mockOnClose = vi.fn();
  const mockSetIsModalVisible = vi.fn();
  const mockFetchPlaylists = vi.fn();

  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: vi.fn().mockResolvedValue({}),
  });

  render(
    <CreatePlaylistModal
      isVisible={true}
      onClose={mockOnClose}
      setIsModalVisible={mockSetIsModalVisible}
      currentPage={1}
      fetchPlaylists={mockFetchPlaylists}
      userId="user123"
    />
  );

  fireEvent.change(screen.getByPlaceholderText('Nome da playlist'), {
    target: { value: 'Nova Playlist' },
  });

  const createButton = screen.getByText('Criar');
  expect(createButton).not.toBeDisabled();

  fireEvent.click(createButton);

  await waitFor(() => expect(mockFetchPlaylists).toHaveBeenCalled());

  expect(mockSetIsModalVisible).toHaveBeenCalledWith(false);

  expect(global.fetch).toHaveBeenCalled();
});

test('disables the create button when playlist name is empty', () => {
  const mockOnClose = vi.fn();
  const mockFetchPlaylists = vi.fn();

  render(
    <CreatePlaylistModal
      isVisible={true}
      onClose={mockOnClose}
      setIsModalVisible={vi.fn()}
      currentPage={1}
      fetchPlaylists={mockFetchPlaylists}
      userId="user123"
    />
  );

  expect(screen.getByText('Criar')).toBeDisabled();

  fireEvent.change(screen.getByPlaceholderText('Nome da playlist'), {
    target: { value: 'Nova Playlist' },
  });

  expect(screen.getByText('Criar')).toBeEnabled();
});
