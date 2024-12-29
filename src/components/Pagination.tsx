import React from 'react';
import styled from 'styled-components';

interface PaginationProps {
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  totalPages: number;
}

const PaginationContainer = styled.div`
  display: flex;
  justify-content: start;
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
    background-color: #949ea2;
    cursor: not-allowed;
  }

  &:enabled:hover {
    background-color: #1aa34a;
    transition: background-color 0.2s ease;
  }

  border-radius: 15px;
`;

const PageButton = styled.button<{ active: boolean }>`
  padding: 8px 12px;
  background-color: ${({ active }) => (active ? '#57B660' : '#fff')};
  color: ${({ active }) => (active ? '#fff' : '#000')};
  border: 1px solid #57b660;
  cursor: pointer;
  border-radius: 15px;

  &:hover {
    opacity: 0.8;
  }
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
