import React from 'react';
import styled from 'styled-components';

interface AlbumListItemProps {
  albumPic: string;
  name: string;
  releaseDate: string;
  albumRedirect: string;
}

const AlbumListItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  cursor: pointer;
  align-items: center;
  transition: transform 0.1s ease;

  &:hover {
    transform: scale(1.03);
    transition: transform 0.3s ease;
  }
`;

const AlbumName = styled.h3`
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
`;

const AlbumReleaseDate = styled.p`
  font-size: 12px;
  line-height: 20px;
  font-weight: 400;
  opacity: 0.8;
`;

const AlbumPicture = styled.img`
  height: 72px;
  width: 72px;
  object-fit: cover;
  object-position: center;
`;

const AlbumDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const AlbumListItem: React.FC<AlbumListItemProps> = ({
  albumPic,
  albumRedirect,
  name,
  releaseDate,
}) => {
  const openAlbum = () => {
    if (!albumRedirect || typeof window === 'undefined') return;

    window.open(albumRedirect, '_blank')?.focus();
  };

  return (
    <AlbumListItemContainer>
      <AlbumPicture src={albumPic} />
      <AlbumDetails onClick={openAlbum}>
        <AlbumName>{name}</AlbumName>
        <AlbumReleaseDate>{releaseDate}</AlbumReleaseDate>
      </AlbumDetails>
    </AlbumListItemContainer>
  );
};

export default AlbumListItem;
