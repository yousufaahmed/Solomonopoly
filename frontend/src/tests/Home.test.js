import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../pages/Home';

jest.mock('../components/navbar', () => () => <div data-testid="navbar" />);
jest.mock('../assets/tree.svg', () => 'mock-tree.svg');

describe('Home Component', () => {
  test('renders heading and subheading', () => {
    render(<Home />);
    expect(screen.getByText('Welcome To Green Exeter')).toBeInTheDocument();
    expect(
      screen.getByText('A place to boost your sustainability on campus!')
    ).toBeInTheDocument();
  });

  test('renders Navbar component', () => {
    render(<Home />);
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
  });

  test('renders tree image', () => {
    render(<Home />);
    const treeImage = screen.getByAltText('tree');
    expect(treeImage).toBeInTheDocument();
    expect(treeImage).toHaveAttribute('src', 'mock-tree.svg');
  });

  test('renders both buttons', () => {
    render(<Home />);
    expect(
      screen.getByText('Learn More About Being Green')
    ).toBeInTheDocument();
    expect(screen.getByText('Scan a QR Code')).toBeInTheDocument();
  });

  test("clicking 'Learn More' navigates to Exeter sustainability site", () => {
    delete window.location;
    window.location = { href: '' };

    render(<Home />);
    fireEvent.click(screen.getByText('Learn More About Being Green'));
    expect(window.location.href).toBe(
      'https://www.exeter.ac.uk/about/sustainability/'
    );
  });

  test("clicking 'Scan a QR Code' navigates to /qr", () => {
    delete window.location;
    window.location = { href: '' };

    render(<Home />);
    fireEvent.click(screen.getByText('Scan a QR Code'));
    expect(window.location.href).toBe('/qr');
  });
});
