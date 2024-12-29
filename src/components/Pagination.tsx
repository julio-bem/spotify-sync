import React from 'react';
import styled from 'styled-components';

interface PaginationProps {
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  totalPages: number;
}

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
  max-width: 958px;
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

const Pagination: React.FC<PaginationProps> = ({
  setCurrentPage,
  currentPage,
  totalPages,
}) => {
  return (
    <PaginationContainer>
      <Button
        onClick={() => setCurrentPage((prev: number) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
      >
        Anterior
      </Button>

      {Array.from({ length: totalPages }, (_, index) => (
        <PageButton
          key={index}
          active={currentPage === index + 1}
          onClick={() => setCurrentPage(index + 1)}
        >
          {index + 1}
        </PageButton>
      ))}

      <Button
        onClick={() =>
          setCurrentPage((prev: number) => Math.min(prev + 1, totalPages))
        }
        disabled={currentPage === totalPages}
      >
        Próximo
      </Button>
    </PaginationContainer>
  );
};

export default Pagination;
