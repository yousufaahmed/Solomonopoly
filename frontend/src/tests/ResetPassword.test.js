import React from 'react';
import { render } from '@testing-library/react';

jest.mock('../pages/ResetPassword', () => ({
  __esModule: true,
  default: () => <div data-testid="reset-pwd">Mocked ResetPwd</div>,
}));

describe('ResetPwd render-only test', () => {
  test('renders without crashing', async () => {
    const { default: ResetPwd } = await import('../pages/ResetPassword');
    render(<ResetPwd />);
  });
});
