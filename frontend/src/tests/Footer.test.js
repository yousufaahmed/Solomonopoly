// Footer.test.jsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '../components/Footer';

// Mock window.location.href to prevent actual navigation
delete window.location;
window.location = { href: '' };

describe('Footer Component', () => {
  // Test 1: Component should render without crashing
  test('renders Footer component', () => {
    render(<Footer />);
    expect(screen.getByAltText('home_img')).toBeInTheDocument();
    expect(screen.getByAltText('user_img')).toBeInTheDocument();
    expect(screen.getByAltText('qr_code_black')).toBeInTheDocument();
  });

  // Test 2: Home button redirects to /home
  test('Home button redirects to /home', () => {
    render(<Footer />);
    const homeButton = screen.getByAltText('home_img').closest('button');
    fireEvent.click(homeButton);
    expect(window.location.href).toBe('/home');
  });

  // Test 3: User button redirects to /user
  test('User button redirects to /user', () => {
    render(<Footer />);
    const userButton = screen.getByAltText('user_img').closest('button');
    fireEvent.click(userButton);
    expect(window.location.href).toBe('/user');
  });

  // Test 4: QR button redirects to /qr
  test('QR button redirects to /qr', () => {
    render(<Footer />);
    const qrButton = screen.getByAltText('qr_code_black').closest('button');
    fireEvent.click(qrButton);
    expect(window.location.href).toBe('/qr');
  });
});
