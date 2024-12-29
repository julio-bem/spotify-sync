import React, { useState, useCallback, useEffect } from 'react';
import NavBar from '../components/NavBar';
import PageHeading from '../components/PageHeading';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Pagination from '../components/Pagination';
import OrdinaryButton from '../components/OrdinaryButton';
import PlaylistListItem from '../components/PlaylistListItem';
import CreatePlaylistModal from '../components/CreatePlaylistModal';

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

const PlaylistListContainer = styled.div`
  min-height: 424px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 0 32px;
`;

const PageHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-right: 32px;
`;

interface Playlist {
  name: string;
  id: string;
  images: { url: string }[];
  external_urls: { spotify: string };
  owner: { display_name: string; id: string };
}

const Playlists: React.FC = () => {
  const [topPlaylists, setTopPlaylists] = useState<Playlist[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const navigate = useNavigate();

  const fetchPlaylists = useCallback(
    async (page: number) => {
      setIsLoading(true);
      const token = localStorage.getItem('accessToken');
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
          navigate('/');
        } else {
          console.error('Erro ao buscar as playlists:', response.statusText);
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
            <p>Carregando...</p>
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
