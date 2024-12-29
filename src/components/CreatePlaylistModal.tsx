import React, { useState } from 'react';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import OrdinaryButton from './OrdinaryButton';

interface CreatePlaylistModalProps {
  isVisible: boolean;
  onClose: () => void;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  currentPage: number;
  fetchPlaylists: (currentPage: number) => void;
  userId: string;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background: #303030;
  padding: 24px 16px;
  border-radius: 32px;
  width: 600px;
  height: 346px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const CloseIconContainer = styled.div`
  margin-left: auto;
`;

const MainContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 208px;
  justify-content: center;
  align-items: center;
  gap: 24px;
`;

const InputLabel = styled.p`
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
`;

const InputPlaylistName = styled.input`
  width: 504px;
  height: 36px;
  background-color: transparent;
  border: 0;
  border-bottom: 1px solid rgb(255, 255, 255, 0.2);

  font-size: 24px;
  font-weight: 700;
  text-align: center;
  color: #fff;

  outline: none;
`;

const CreatePlaylistModal: React.FC<CreatePlaylistModalProps> = ({
  isVisible,
  onClose,
  setIsModalVisible,
  fetchPlaylists,
  currentPage,
  userId,
}) => {
  const [playlistName, setPlaylistName] = useState('');

  const createPlaylist = (newPlaylistName: string, userId: string) => {
    const token = localStorage.getItem('accessToken');

    fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: newPlaylistName,
        public: true,
      }),
    })
      .then((response) => {
        if (response.ok) {
          setIsModalVisible(false);
          fetchPlaylists(currentPage);
        } else {
          console.error('Erro ao criar a playlist:', response.statusText);
        }
      })
      .catch((error) => {
        console.error('Erro na requisição:', error);
      });
  };

  const handleCreate = () => {
    createPlaylist(playlistName, userId);
    setPlaylistName('');
  };

  if (!isVisible) return null;

  return (
    <ModalOverlay>
      <ModalContainer>
        <CloseIconContainer>
          <MdClose onClick={onClose} size={32} />
        </CloseIconContainer>
        <MainContentContainer>
          <InputLabel>Dê um nome a sua playlist</InputLabel>
          <InputPlaylistName
            type="text"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            placeholder="Nome da playlist"
          />
        </MainContentContainer>
        <OrdinaryButton
          width="121px"
          height="42px"
          onClick={handleCreate}
          disabled={!playlistName.trim()}
        >
          Criar
        </OrdinaryButton>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default CreatePlaylistModal;
