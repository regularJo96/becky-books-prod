import { render, screen } from '@testing-library/react';
import BookShelf from './BookShelf';

test('renders learn react link', () => {
  render(<BookShelf />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
