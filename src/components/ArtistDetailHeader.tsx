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
`;

const Title = styled.h1`
  font-size: 28px;
  line-height: 32px;
  font-weight: 600;
  margin-right: 8px;
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
    <ArtistDetailHeaderContainer>
      <IoArrowBackOutline
        cursor="pointer"
        size={32}
        onClick={() => navigate(-1)}
      />
      <Title>{name}</Title> <ArtistProfilePicture src={profilePic} />
    </ArtistDetailHeaderContainer>
  );
};

export default ArtistDetailHeader;
