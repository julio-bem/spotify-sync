import React from 'react';
import styled from 'styled-components';
import useMediaQuery from '../hooks/useMediaQuery';

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

  @media (max-width: 767px) {
    padding: 0 24px;
    align-self: center;
  }
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #006600;
  color: #fff;
  border: none;
  cursor: pointer;
  &:disabled {
    background-color: #949ea2;
    cursor: not-allowed;
  }

  &:enabled:hover {
    background-color: #005700;
    transition: background-color 0.2s ease;
  }

  border-radius: 15px;
`;

const PageButton = styled.button<{ active: boolean }>`
  padding: 8px 12px;
  background-color: ${({ active }) => (active ? '#006600' : '#fff')};
  color: ${({ active }) => (active ? '#fff' : '#000')};
  border: 1px solid #006600;
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
  const mediaQuery = useMediaQuery();

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = mediaQuery === 'mobile' ? 3 : 5;
    let startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1);
    const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(endPage - maxPagesToShow + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <PageButton
          key={i}
          active={currentPage === i}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </PageButton>
      );
    }

    return pageNumbers;
  };

  return (
    <PaginationContainer>
      <Button
        onClick={() => setCurrentPage((prev: number) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
      >
        Anterior
      </Button>

      {renderPageNumbers()}

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
