import React, { useState, useCallback, useEffect } from 'react';
import NavBar from '../components/NavBar';
import PageHeading from '../components/PageHeading';
import styled from 'styled-components';
import Pagination from '../components/Pagination';
import OrdinaryButton from '../components/OrdinaryButton';
import PlaylistListItem from '../components/PlaylistListItem';
import CreatePlaylistModal from '../components/CreatePlaylistModal';
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
  width: 100%;

  @media (max-width: 767px) {
    margin-top: 60px;
  }
`;

const PlaylistListContainer = styled.div`
  min-height: 424px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 0 32px;

  @media (max-width: 767px) {
    margin: 0 24px;
    min-height: 400px;
  }
`;

const PageHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-right: 32px;

  @media (max-width: 767px) {
    padding: 0 24px 0 0;
  }
`;

interface Playlist {
  name: string;
  id: string;
  images: { url: string }[];
  external_urls: { spotify: string };
  owner: { display_name: string; id: string };
}

const Playlists: React.FC = () => {
  const { accessToken } = useAuth();
  const { getRefreshToken } = useRefreshToken();

  const [topPlaylists, setTopPlaylists] = useState<Playlist[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchPlaylists = useCallback(
    async (page: number) => {
      setIsLoading(true);
      const token = accessToken || localStorage.getItem('accessToken');
      const limit = 5;
      const offset = (page - 1) * limit;

      try {
        const response = await fetch(
          `https://api.spotify.com/v1/me/playlists?limit=${limit}&offset=${offset}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setTopPlaylists(data.items);
          setTotalPages(Math.ceil(data.total / limit));
        } else if (response.status === 401) {
          await getRefreshToken();
          fetchPlaylists(page);
        } else {
          console.error('Erro ao buscar as playlists:', response.statusText);
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Erro na requisição:', error);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [accessToken]
  );

  useEffect(() => {
    fetchPlaylists(currentPage);
  }, [currentPage, fetchPlaylists]);

  return (
    <PageContainer>
      <NavBar activePage="playlists" />
      <PageMainContainer>
        <PageHeader>
          <PageHeading
            title="Minhas Playlists"
            subtitle="Sua coleção pessoal de playlists"
          />
          <OrdinaryButton
            width="185px"
            height="42px"
            onClick={() => setIsModalVisible(true)}
          >
            Criar playlist
          </OrdinaryButton>
        </PageHeader>
        <PlaylistListContainer>
          {isLoading ? (
            <OrdinaryText>Carregando...</OrdinaryText>
          ) : (
            topPlaylists.map((playlist) => (
              <PlaylistListItem
                key={playlist.id}
                owner={playlist.owner.display_name}
                name={playlist.name}
                playlistPic={playlist?.images ? playlist?.images[0]?.url : ''}
                playlistRedirect={playlist.external_urls.spotify}
              />
            ))
          )}
        </PlaylistListContainer>
        <Pagination
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </PageMainContainer>

      <CreatePlaylistModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        setIsModalVisible={setIsModalVisible}
        fetchPlaylists={fetchPlaylists}
        currentPage={currentPage}
        userId={topPlaylists?.length > 0 ? topPlaylists[0].owner.id : ''}
      />
    </PageContainer>
  );
};

export default Playlists;
