import React, { useCallback, useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import OrdinaryButton from '../components/OrdinaryButton';

const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const PageMainContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  width: 100%;
`;

const ProfileAvatar = styled.img`
  height: 128px;
  width: 128px;
  border-radius: 100%;
  object-fit: cover;
  object-position: center;
`;

const ProfileTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  line-height: 20px;
  color: #fff;
  margin-bottom: 11px;
`;

interface Profile {
  id: string;
  display_name: string;
  images: { url: string }[];
}

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [currentProfile, setCurrentProfile] = useState<Profile>();

  const fetchUserProfile = useCallback(async () => {
    const token = localStorage.getItem('accessToken');

    try {
      const response = await fetch(`https://api.spotify.com/v1/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCurrentProfile(data);
      } else if (response.status === 401) {
        navigate('/');
      } else {
        console.error('Erro ao buscar perfil:', response.statusText);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();

    navigate('/');
  };

  useEffect(() => {
    if (!currentProfile) fetchUserProfile();
  }, [currentProfile, fetchUserProfile]);

  return (
    <PageContainer>
      <NavBar activePage="profile" />
      <PageMainContainer>
        {isLoading ? (
          <p>Carregando...</p>
        ) : currentProfile ? (
          <>
            <ProfileAvatar src={currentProfile.images[0].url} />
            <ProfileTitle>{currentProfile.display_name}</ProfileTitle>
            <OrdinaryButton
              fontWeight="700"
              width="113px"
              height="42px"
              onClick={handleLogout}
            >
              Sair
            </OrdinaryButton>
          </>
        ) : (
          <p>Erro ao obter dados</p>
        )}
      </PageMainContainer>
    </PageContainer>
  );
};

export default Profile;
