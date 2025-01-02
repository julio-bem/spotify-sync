import React, { useCallback, useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import OrdinaryButton from '../components/OrdinaryButton';
import { useAuth } from '../contexts/AuthContext';
import OrdinaryText from '../components/OrdinaryText';
import fallbackProfilePicture from '../assets/images/fallback-profile-picture.jpg';
import { useRefreshToken } from '../hooks/useRefreshToken';

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

  @media (max-width: 767px) {
    margin-top: 60px;
    height: calc(100vh - 60px);
  }
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
  const { accessToken, setAuthInfo } = useAuth();
  const { getRefreshToken } = useRefreshToken();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [currentProfile, setCurrentProfile] = useState<Profile>();

  const fetchUserProfile = useCallback(async () => {
    setIsLoading(true);
    const token = accessToken || localStorage.getItem('accessToken');

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
        await getRefreshToken();
        fetchUserProfile();
      } else {
        console.error('Erro ao buscar perfil:', response.statusText);
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  const handleLogout = () => {
    localStorage.clear();

    setAuthInfo({
      access_token: null,
      expires_in: null,
      token_type: null,
      refresh_token: null,
    });

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
          <OrdinaryText>Carregando...</OrdinaryText>
        ) : currentProfile ? (
          <>
            <ProfileAvatar
              src={
                currentProfile.images?.length > 0
                  ? currentProfile.images[0].url
                  : fallbackProfilePicture
              }
              alt="Imagem de perfil do usuário"
            />
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
          <OrdinaryText>Erro ao obter dados</OrdinaryText>
        )}
      </PageMainContainer>
    </PageContainer>
  );
};

export default Profile;
