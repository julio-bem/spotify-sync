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

interface Artist {
  id: string;
  name: string;
  images: { url: string }[];
}

const Artists: React.FC = () => {
  const [topArtists, setTopArtists] = useState<Artist[]>([]);

  useEffect(() => {
    const fetchTopArtists = async () => {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(
        'https://api.spotify.com/v1/me/top/artists?limit=10&time_range=medium_term',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setTopArtists(data.items);
      } else {
        console.error('Erro ao buscar os top artistas:', response.statusText);
      }
    };

    fetchTopArtists();
  }, []);

  return (
    <PageContainer>
      <NavBar activePage="artists" />
      <PageMainContainer>
        <PageHeading
          title="Top Artistas"
          subtitle="Aqui você encontra seus artistas preferidos"
        />
        {topArtists.map((artist) => (
          <ArtistListItem
            key={artist.id}
            profilePic={artist.images[0]?.url || ''}
            name={artist.name}
          />
        ))}
      </PageMainContainer>
    </PageContainer>
  );
};

export default Artists;
