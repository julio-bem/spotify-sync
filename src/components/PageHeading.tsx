import React from 'react';
import styled from 'styled-components';

interface HeadingProps {
  title: string;
  subtitle?: string;
}

const PageHeadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 32px;
`;

const Title = styled.h1`
  font-size: 28px;
  line-height: 32px;
  font-weight: 600;
`;

const Subtitle = styled.h2`
  font-size: 16px;
  font-weight: 400;
  line-height: 18px;
`;

const PageHeading: React.FC<HeadingProps> = ({ title, subtitle }) => {
  return (
    <PageHeadingContainer>
      <Title>{title}</Title>
      {subtitle ? <Subtitle>{subtitle}</Subtitle> : null}
    </PageHeadingContainer>
  );
};

export default PageHeading;
