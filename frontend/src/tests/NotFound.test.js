import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';

describe('NotFound Page', () => {
  test('renders 404 heading and message', () => {
    render(<NotFound />);
    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
    expect(
      screen.getByText("The page you're looking for doesn't exist!")
    ).toBeInTheDocument();
  });
});
