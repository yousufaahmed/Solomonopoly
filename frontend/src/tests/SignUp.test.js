// Written by Mohammed Zarrar Shahid

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SignUp from '../pages/SignUp';

// Save the original window.location so we can restore it later
const originalLocation = window.location;

beforeEach(() => {
  // Override window.location for navigation tests
  delete window.location;
  window.location = { href: '', assign: jest.fn() };
});

afterAll(() => {
  // Restore original window.location after tests complete
  window.location = originalLocation;
});

describe('SignUp Component', () => {
  test('renders header with title and subtitle', () => {
    render(<SignUp />);
    expect(screen.getByText('Create Your')).toBeInTheDocument();
    expect(screen.getByText('Account')).toBeInTheDocument();
  });

  test('renders all input fields with correct placeholders', () => {
    render(<SignUp />);
    expect(screen.getByPlaceholderText('Full Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email Address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument();
  });

  test('renders SIGN UP button and footer sign in link', () => {
    render(<SignUp />);
    expect(screen.getByRole('button', { name: /SIGN UP/i })).toBeInTheDocument();
    expect(screen.getByText("Have an account?")).toBeInTheDocument();
    // Verify the "Sign In" link exists with correct href
    expect(screen.getByRole('link', { name: /Sign In/i })).toHaveAttribute('href', '/loginform');
  });

  test('navigates to /splashscreen when the close button is clicked', () => {
    render(<SignUp />);
    const closeButton = screen.getByRole('button', { name: 'X' });
    fireEvent.click(closeButton);
    expect(window.location.href).toBe('/splashscreen');
  });

  test('navigates to /home when the SIGN UP button is clicked', () => {
    render(<SignUp />);
    const signUpButton = screen.getByRole('button', { name: /SIGN UP/i });
    fireEvent.click(signUpButton);
    expect(window.location.href).toBe('/home');
  });
});
