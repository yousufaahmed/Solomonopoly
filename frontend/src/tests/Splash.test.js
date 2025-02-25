// Splash.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SplashScreen from '../pages/Splash';
import logo from '../assets/logo.svg';

describe('SplashScreen Component', () => {
  // Test 1: Component should render without crashing
  test('renders SplashScreen component', () => {
    render(<SplashScreen />);
    expect(screen.getByText('Welcome Back')).toBeInTheDocument();
  });

  // Test 2: Logo is displayed with correct src and alt text
  test('displays the logo with correct src and alt text', () => {
    render(<SplashScreen />);
    const logoImage = screen.getByAltText('Green Exeter Logo');
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', logo);
  });

  // Test 3: Welcome text is displayed correctly
  test('renders the welcome text', () => {
    render(<SplashScreen />);
    const welcomeText = screen.getByText('Welcome Back');
    expect(welcomeText).toBeInTheDocument();
    expect(welcomeText).toHaveClass('welcome-text');
  });

  // Test 4: SIGN IN and SIGN UP buttons are displayed with correct links
  test('displays SIGN IN and SIGN UP buttons with correct links', () => {
    render(<SplashScreen />);
    
    const signInButton = screen.getByText('SIGN IN');
    const signUpButton = screen.getByText('SIGN UP');

    expect(signInButton).toBeInTheDocument();
    expect(signUpButton).toBeInTheDocument();

    expect(signInButton).toHaveAttribute('href', '/loginform');
    expect(signUpButton).toHaveAttribute('href', '/signup');

    expect(signInButton).toHaveClass('splashbutton');
    expect(signUpButton).toHaveClass('splashbutton');
  });

  // Test 5: Button container is displayed
  test('displays button container', () => {
    render(<SplashScreen />);
    // Using querySelector to find by className since there's no role
    const buttonContainer = document.querySelector('.splash-button');
    expect(buttonContainer).toBeInTheDocument();
  });
});
