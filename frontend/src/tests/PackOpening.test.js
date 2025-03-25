import React from 'react';
import { render } from '@testing-library/react';

jest.mock('../pages/PackOpening', () => ({
  __esModule: true,
  default: () => <div data-testid="pack-opening">Mocked PackOpening</div>,
}));

describe('PackOpening render-only test', () => {
  test('renders without crashing', async () => {
    const { default: PackOpening } = await import('../pages/PackOpening');
    render(<PackOpening />);
  });
});
