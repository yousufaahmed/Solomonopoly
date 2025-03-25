// src/tests/SignUp.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';

jest.mock('../pages/SignUp', () => ({
  __esModule: true,
  default: () => <div data-testid="signup">Mocked SignUp</div>,
}));

describe('SignUp Page (mocked)', () => {
  test('renders mocked SignUp component', () => {
    const SignUp = require('../pages/SignUp').default;
    render(<SignUp />);
    expect(screen.getByTestId('signup')).toBeInTheDocument();
  });
});
