import React from 'react';
import styled from 'styled-components';

interface HeadingProps {
  profilePic: string;
  name: string;
}

const ArtistListItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  cursor: pointer;
  align-items: center;
  margin: 0 32px;
  transition: transform 0.1s ease;

  &:hover {
    transform: scale(1.03);
    transition: transform 0.3s ease;
  }
`;

const ArtistName = styled.h3`
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
`;

const ArtistProfilePicture = styled.img`
  height: 64px;
  width: 64px;
  border-radius: 100%;
  object-fit: cover;
  object-position: center;
`;

const ArtistListItem: React.FC<HeadingProps> = ({ profilePic, name }) => {
  return (
    <ArtistListItemContainer>
      <ArtistProfilePicture src={profilePic} />
      <ArtistName>{name}</ArtistName>
    </ArtistListItemContainer>
  );
};

export default ArtistListItem;
