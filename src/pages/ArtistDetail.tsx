import React, { useCallback, useEffect, useState } from 'react';
import { useArtist } from '../contexts/ArtistContext';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import styled from 'styled-components';
import ArtistDetailHeader from '../components/ArtistDetailHeader';

const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const PageMainContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #1db954;
  color: #fff;
  border: none;
  cursor: pointer;
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const PageButton = styled.button<{ active: boolean }>`
  padding: 8px 12px;
  background-color: ${({ active }) => (active ? '#1db954' : '#fff')};
  color: ${({ active }) => (active ? '#fff' : '#000')};
  border: 1px solid #1db954;
  cursor: pointer;
`;

const AlbumListContainer = styled.div`
  min-height: 400px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 0 32px;
`;

const ArtistDetail: React.FC = () => {
  const { artist } = useArtist();
  const navigate = useNavigate();

  const [albums, setAlbums] = useState([]);

  const fetchArtistAlbums = useCallback(
    async (artistId: string) => {
      const token = localStorage.getItem('accessToken');
      const limit = 50;

      try {
        const response = await fetch(
          `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album&limit=${limit}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setAlbums(data.items);
        } else if (response.status === 401) {
          navigate('/');
        } else {
          console.error('Erro ao buscar os albums:', response.statusText);
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
      }
    },
    [navigate]
  );

  useEffect(() => {
    if (!artist || !artist.id) {
      navigate('/artists');
    } else {
      fetchArtistAlbums(artist.id);
    }
  }, [artist, fetchArtistAlbums, navigate]);

  if (!artist) {
    return null;
  }

  return (
    <PageContainer>
      <NavBar activePage="artists" />
      <PageMainContainer>
        <ArtistDetailHeader name={artist.name} profilePic={artist.profilePic} />
        <AlbumListContainer>
          {albums.map((album) => (
            <div key={album.id}>{album.name}</div>
          ))}
        </AlbumListContainer>
      </PageMainContainer>
    </PageContainer>
  );
};

export default ArtistDetail;
