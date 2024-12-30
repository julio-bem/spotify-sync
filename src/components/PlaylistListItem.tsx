import React from 'react';
import styled from 'styled-components';

interface PlaylistListItemProps {
  playlistPic: string;
  name: string;
  owner: string;
  playlistRedirect: string;
}

const PlaylistListItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  cursor: pointer;
  align-items: center;
  width: 100%;
  max-width: 958px;
  transition: transform 0.1s ease;

  &:hover {
    transform: scale(1.03);
    transition: transform 0.3s ease;
  }
`;

const PlaylistName = styled.h3`
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
`;

const PlaylistOwner = styled.p`
  font-size: 12px;
  line-height: 20px;
  font-weight: 400;
  opacity: 0.8;
`;

const PlaylistPicture = styled.img`
  height: 72px;
  width: 72px;
  object-fit: cover;
  object-position: center;
`;

const PlaylistDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const PlaylistListItem: React.FC<PlaylistListItemProps> = ({
  playlistPic,
  playlistRedirect,
  name,
  owner,
}) => {
  const openPlaylist = () => {
    if (!playlistRedirect || typeof window === 'undefined') return;

    window.open(playlistRedirect, '_blank')?.focus();
  };

  return (
    <PlaylistListItemContainer data-testid="playlist-list-item">
      <PlaylistPicture src={playlistPic} />
      <PlaylistDetails onClick={openPlaylist}>
        <PlaylistName>{name}</PlaylistName>
        <PlaylistOwner>{owner}</PlaylistOwner>
      </PlaylistDetails>
    </PlaylistListItemContainer>
  );
};

export default PlaylistListItem;
