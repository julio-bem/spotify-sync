import React from 'react';
import { render, screen } from '@testing-library/react';
import PageHeading from '../components/PageHeading';

test('renders the title correctly', () => {
  render(<PageHeading title="Test Title" />);

  expect(screen.getByText('Test Title')).toBeInTheDocument();
});

test('renders the subtitle correctly when provided', () => {
  render(<PageHeading title="Test Title" subtitle="Test Subtitle" />);

  expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
});

test('does not render subtitle when not provided', () => {
  render(<PageHeading title="Test Title" />);

  expect(screen.queryByText('Test Subtitle')).toBeNull();
});
