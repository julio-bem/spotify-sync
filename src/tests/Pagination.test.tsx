import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Pagination from '../components/Pagination';

test('renders pagination buttons correctly', () => {
  const mockSetCurrentPage = vi.fn();
  const currentPage = 1;
  const totalPages = 5;

  render(
    <Pagination
      setCurrentPage={mockSetCurrentPage}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  );

  expect(screen.getByText('1')).toBeInTheDocument();
  expect(screen.getByText('2')).toBeInTheDocument();
  expect(screen.getByText('3')).toBeInTheDocument();
  expect(screen.getByText('4')).toBeInTheDocument();
  expect(screen.getByText('5')).toBeInTheDocument();
});

test('disables previous button when on the first page', () => {
  const mockSetCurrentPage = vi.fn();
  const currentPage = 1;
  const totalPages = 5;

  render(
    <Pagination
      setCurrentPage={mockSetCurrentPage}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  );

  const previousButton = screen.getByText('Anterior');
  expect(previousButton).toBeDisabled();
});

test('disables next button when on the last page', () => {
  const mockSetCurrentPage = vi.fn();
  const currentPage = 5;
  const totalPages = 5;

  render(
    <Pagination
      setCurrentPage={mockSetCurrentPage}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  );

  const nextButton = screen.getByText('Próximo');
  expect(nextButton).toBeDisabled();
});

test('changes page when a page button is clicked', () => {
  const mockSetCurrentPage = vi.fn();
  const currentPage = 1;
  const totalPages = 5;

  render(
    <Pagination
      setCurrentPage={mockSetCurrentPage}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  );

  fireEvent.click(screen.getByText('3'));

  expect(mockSetCurrentPage).toHaveBeenCalledWith(3);
});

test('disables the previous button when on the first page', () => {
  const mockSetCurrentPage = vi.fn();
  const currentPage = 1;
  const totalPages = 5;

  render(
    <Pagination
      setCurrentPage={mockSetCurrentPage}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  );

  const previousButton = screen.getByText('Anterior');
  expect(previousButton).toBeDisabled();
});
