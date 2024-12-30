import React from 'react';
import styled from 'styled-components';
import { IoArrowBackOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

interface ArtistDetailProps {
  name: string;
  profilePic?: string;
}

const ArtistDetailHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  height: 128px;
  margin: 0 32px;
`;

const Title = styled.h1`
  font-size: 16px;
  line-height: 20px;
  font-weight: 700;
  margin-left: 8px;
`;

const ArtistProfilePicture = styled.img`
  height: 64px;
  width: 64px;
  border-radius: 100%;
  object-fit: cover;
  object-position: center;
  margin-left: auto;
`;

const ArtistDetailHeader: React.FC<ArtistDetailProps> = ({
  name,
  profilePic,
}) => {
  const navigate = useNavigate();

  return (
    <ArtistDetailHeaderContainer data-testid="artist-details">
      <IoArrowBackOutline
        cursor="pointer"
        size={32}
        onClick={() => navigate(-1)}
      />
      <Title>{name}</Title>
      <ArtistProfilePicture
        src={profilePic}
        alt="Imagem de perfil do artista"
      />
    </ArtistDetailHeaderContainer>
  );
};

export default ArtistDetailHeader;
