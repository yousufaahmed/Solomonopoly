// QRScreen.test.jsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import QRScreen from '../pages/QRScreen';

// Mock the Footer component to isolate testing to QRScreen
jest.mock('../components/Footer', () => () => <div>Footer Mock</div>);

// Mock react-webcam to avoid accessing the user's camera during tests
jest.mock('react-webcam', () => (props) => (
  <div data-testid="webcam-mock">
    Webcam Mock
  </div>
));

// Mock alert to prevent errors in JSDOM
beforeAll(() => {
  window.alert = jest.fn();
});

describe('QRScreen Component', () => {
  // Test 1: Component should render without crashing
  test('renders QRScreen component', () => {
    render(<QRScreen />);
    expect(screen.getByText('Scan QR')).toBeInTheDocument();
    expect(screen.getByText("Use your phone's camera to scan a QR code")).toBeInTheDocument();
  });

  // Test 2: Webcam and overlay are displayed
  test('displays webcam and overlay', () => {
    render(<QRScreen />);
    const webcam = screen.getByTestId('webcam-mock');
    const overlay = screen.getByAltText('QR Overlay');
    expect(webcam).toBeInTheDocument();
    expect(overlay).toBeInTheDocument();
  });

  // Test 3: Flashlight button is displayed
  test('displays flashlight button', () => {
    render(<QRScreen />);
    
    // Use querySelector to find the button by its class name
    const flashlightButton = document.querySelector('.torch-button');
    
    expect(flashlightButton).toBeInTheDocument();
  });

  // Test 4: Footer component is displayed
  test('displays the footer component', () => {
    render(<QRScreen />);
    expect(screen.getByText('Footer Mock')).toBeInTheDocument();
  });
});
