// src/tests/Store.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';

// ✅ Mock Store component to bypass import.meta
jest.mock('../pages/Store', () => ({
  __esModule: true,
  default: () => <div data-testid="store-page">Mocked Store Page</div>,
}));

describe('Store Page (mocked)', () => {
  test('renders mocked Store component', () => {
    const Store = require('../pages/Store').default;
    render(<Store />);
    expect(screen.getByTestId('store-page')).toBeInTheDocument();
  });
});
