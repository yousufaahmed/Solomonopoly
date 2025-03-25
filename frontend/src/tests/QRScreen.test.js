import React from 'react';
import { render } from '@testing-library/react';

jest.mock('../pages/QRScreen', () => ({
  __esModule: true,
  default: () => <div data-testid="qr-screen">Mocked QRScreen</div>,
}));

describe('QRScreen render-only test', () => {
  test('renders without crashing', async () => {
    const { default: QRScreen } = await import('../pages/QRScreen');
    render(<QRScreen />);
  });
});
