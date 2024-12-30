import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useArtist } from '../contexts/ArtistContext';

interface ArtistListItemProps {
  id: string;
  profilePic: string;
  name: string;
  ranking: number;
}

const ArtistListItemContainer = styled.div`
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

const ArtistListItem: React.FC<ArtistListItemProps> = ({
  id,
  profilePic,
  name,
  ranking,
}) => {
  const navigate = useNavigate();
  const { setArtist } = useArtist();

  const handleClick = () => {
    setArtist({ id, name, profilePic });
    navigate(`/artist/${name.replace(' ', '+')}`);
  };

  const getRankingIcon = (ranking: number) => {
    switch (ranking) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return null;
    }
  };

  return (
    <ArtistListItemContainer data-testid="artist-item" onClick={handleClick}>
      <ArtistProfilePicture src={profilePic} />
      <ArtistName>
        {name}
        {` `}
        {getRankingIcon(ranking)}
      </ArtistName>
    </ArtistListItemContainer>
  );
};

export default ArtistListItem;
