// Written by Mohammed Zarrar Shahid

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from '../pages/LoginForm';

// Save original window.location to restore later
const originalLocation = window.location;

beforeAll(() => {
  // Override window.location so we can test navigation without actually reloading
  delete window.location;
  window.location = { href: '', assign: jest.fn() };
});

afterAll(() => {
  // Restore original window.location after tests run
  window.location = originalLocation;
});

describe('LoginForm Component', () => {
  test('renders header with greeting and prompt', () => {
    render(<LoginForm />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('Sign In!')).toBeInTheDocument();
  });

  test('renders email and password input fields', () => {
    render(<LoginForm />);
    expect(screen.getByPlaceholderText('Email Address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  test('renders forgot password link', () => {
    render(<LoginForm />);
    expect(screen.getByText('Forgot password?')).toBeInTheDocument();
  });

  test('renders the SIGN IN button and footer sign up link', () => {
    render(<LoginForm />);
    expect(screen.getByRole('button', { name: /SIGN IN/i })).toBeInTheDocument();
    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Sign up/i })).toBeInTheDocument();
  });

  test('navigates to /splashscreen when the close button is clicked', () => {
    render(<LoginForm />);
    const closeButton = screen.getByRole('button', { name: 'X' });
    fireEvent.click(closeButton);
    expect(window.location.href).toBe('/splashscreen');
  });

  test('navigates to /home when the SIGN IN button is clicked', () => {
    render(<LoginForm />);
    const signInButton = screen.getByRole('button', { name: /SIGN IN/i });
    fireEvent.click(signInButton);
    expect(window.location.href).toBe('/home');
  });
});
