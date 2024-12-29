import React from 'react';
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

const Artists: React.FC = () => {
  return (
    <PageContainer>
      <NavBar activePage="artists" />
      <PageMainContainer>
        <PageHeading
          title="Top Artistas"
          subtitle="Aqui você encontra seus artistas preferidos"
        />
        <ArtistListItem profilePic="" name="" />
      </PageMainContainer>
    </PageContainer>
  );
};

export default Artists;
