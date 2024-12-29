import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import PageHeading from '../components/PageHeading';
import styled from 'styled-components';
import ArtistListItem from '../components/ArtistListItem';

const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const PageMainContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
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

interface Artist {
  id: string;
  name: string;
  images: { url: string }[];
}

const Artists: React.FC = () => {
  const [topArtists, setTopArtists] = useState<Artist[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTopArtists = async (page: number) => {
    setIsLoading(true);
    const token = localStorage.getItem('accessToken');
    const limit = 5;
    const offset = (page - 1) * limit;

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
    } else {
      console.error('Erro ao buscar os top artistas:', response.statusText);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTopArtists(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <PageContainer>
      <NavBar activePage="artists" />
      <PageMainContainer>
        <PageHeading
          title="Top Artistas"
          subtitle="Aqui você encontra seus artistas preferidos"
        />
        {isLoading ? (
          <p>Carregando...</p>
        ) : (
          topArtists.map((artist, index) => (
            <ArtistListItem
              key={artist.id}
              profilePic={artist.images[0]?.url || ''}
              name={artist.name}
              ranking={index + 1}
            />
          ))
        )}
        <PaginationContainer>
          <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
            Anterior
          </Button>
          {[...Array(totalPages)].map((_, index) => (
            <PageButton
              key={index + 1}
              active={currentPage === index + 1}
              onClick={() => handlePageClick(index + 1)}
            >
              {index + 1}
            </PageButton>
          ))}
          <Button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Próxima
          </Button>
        </PaginationContainer>
      </PageMainContainer>
    </PageContainer>
  );
};

export default Artists;
