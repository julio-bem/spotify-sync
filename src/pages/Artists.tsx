import React, { useCallback, useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import PageHeading from '../components/PageHeading';
import styled from 'styled-components';
import ArtistListItem from '../components/ArtistListItem';
import Pagination from '../components/Pagination';
import { useAuth } from '../contexts/AuthContext';
import OrdinaryText from '../components/OrdinaryText';
import { useRefreshToken } from '../hooks/useRefreshToken';

const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const PageMainContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 767px) {
    margin-top: 60px;
    width: 100%;
  }
`;

const ArtistListContainer = styled.div`
  min-height: 400px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 0 32px;

  @media (max-width: 767px) {
    margin: 0 24px;
  }
`;

interface Artist {
  id: string;
  name: string;
  images: { url: string }[];
}

const Artists: React.FC = () => {
  const { accessToken } = useAuth();

  const [topArtists, setTopArtists] = useState<Artist[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { getRefreshToken } = useRefreshToken();

  const fetchTopArtists = useCallback(
    async (page: number) => {
      setIsLoading(true);
      const token = accessToken || localStorage.getItem('accessToken');
      const limit = 5;
      const offset = (page - 1) * limit;

      try {
        const response = await fetch(
          `https://api.spotify.com/v1/me/top/artists?limit=${limit}&offset=${offset}&time_range=medium_term`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setTopArtists(data.items);
          setTotalPages(Math.ceil(data.total / limit));
        } else if (response.status === 401) {
          await getRefreshToken();
          fetchTopArtists(page);
        } else {
          console.error('Erro ao buscar os top artistas:', response.statusText);
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
      } finally {
        setIsLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [accessToken]
  );

  useEffect(() => {
    fetchTopArtists(currentPage);
  }, [currentPage, fetchTopArtists]);

  return (
    <PageContainer>
      <NavBar activePage="artists" />
      <PageMainContainer>
        <PageHeading
          title="Top Artistas"
          subtitle="Aqui você encontra seus artistas preferidos"
        />
        <ArtistListContainer data-testid="artist-list">
          {isLoading ? (
            <OrdinaryText>Carregando...</OrdinaryText>
          ) : (
            topArtists.map((artist, index) => (
              <ArtistListItem
                key={artist.id}
                id={artist.id}
                profilePic={artist.images[0]?.url || ''}
                name={artist.name}
                ranking={Number(`${currentPage - 1}${index + 1}`)}
              />
            ))
          )}
        </ArtistListContainer>
        <Pagination
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </PageMainContainer>
    </PageContainer>
  );
};

export default Artists;
