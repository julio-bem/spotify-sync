import React from 'react';
import NavBar from '../components/NavBar';
import PageHeading from '../components/PageHeading';
import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Artists: React.FC = () => {
  return (
    <PageContainer>
      <NavBar activePage="artists" />
      <PageHeading
        title="Top Artistas"
        subtitle="Aqui você encontra seus artistas preferidos"
      />
    </PageContainer>
  );
};

export default Artists;
