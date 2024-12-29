import React, { useCallback, useEffect, useState } from 'react';
import { useArtist } from '../contexts/ArtistContext';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import styled from 'styled-components';
import ArtistDetailHeader from '../components/ArtistDetailHeader';
import AlbumListItem from '../components/AlbumListItem';

interface Album {
  name: string;
  images: { url: string }[];
  id?: string;
  release_date: string;
  external_urls: { spotify: string };
}

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
  max-width: 958px;
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

  const [albums, setAlbums] = useState<Album[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchArtistAlbums = useCallback(
    async (artistId: string, page: number) => {
      const token = localStorage.getItem('accessToken');
      const limit = 5;
      const offset = (page - 1) * limit;

      try {
        setIsLoading(true);
        const response = await fetch(
          `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album&limit=${limit}&offset=${offset}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setAlbums(data.items);
          setTotalPages(Math.ceil(data.total / limit));
        } else if (response.status === 401) {
          navigate('/');
        } else {
          console.error('Erro ao buscar os álbuns:', response.statusText);
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [navigate]
  );

  useEffect(() => {
    if (!artist || !artist.id) {
      navigate('/artists');
    } else {
      fetchArtistAlbums(artist.id, currentPage);
    }
  }, [artist, currentPage, fetchArtistAlbums, navigate]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  if (!artist) {
    return null;
  }

  return (
    <PageContainer>
      <NavBar activePage="artists" />
      <PageMainContainer>
        <ArtistDetailHeader name={artist.name} profilePic={artist.profilePic} />
        <AlbumListContainer>
          {isLoading ? (
            <p>Carregando...</p>
          ) : (
            albums.map((album) => {
              const formattedReleaseDate = formatDate(album.release_date);
              return (
                <AlbumListItem
                  albumPic={album.images[0]?.url || ''}
                  albumRedirect={album.external_urls.spotify}
                  name={album.name}
                  releaseDate={formattedReleaseDate}
                  key={album.id}
                />
              );
            })
          )}
        </AlbumListContainer>

        <PaginationContainer>
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Anterior
          </Button>

          {Array.from({ length: totalPages }, (_, index) => (
            <PageButton
              key={index}
              active={currentPage === index + 1}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </PageButton>
          ))}

          <Button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Próximo
          </Button>
        </PaginationContainer>
      </PageMainContainer>
    </PageContainer>
  );
};

export default ArtistDetail;
