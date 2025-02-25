// Written by Mohammed Zarrar Shahid

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserProfile from '../pages/UserProfile';

// Mock the Footer component so we can isolate UserProfile tests
jest.mock('../components/footer', () => () => <div data-testid="footer">Mock Footer</div>);

describe('UserProfile Component', () => {
  // Save and override window.location to simulate navigation without reloading
  const originalLocation = window.location;

  beforeEach(() => {
    delete window.location;
    window.location = { href: '', assign: jest.fn() };
  });

  afterEach(() => {
    window.location = originalLocation;
  });

  test('renders sign out button and navigates to /splashscreen on click', () => {
    render(<UserProfile />);
    const signOutImage = screen.getByAltText('signout');
    expect(signOutImage).toBeInTheDocument();
    fireEvent.click(signOutImage);
    expect(window.location.href).toBe('/splashscreen');
  });

  test('renders coins button with coin image and balance', () => {
    render(<UserProfile />);
    const coinsImage = screen.getByAltText('coins');
    expect(coinsImage).toBeInTheDocument();
  });

  test('renders user profile image', () => {
    render(<UserProfile />);
    const userImage = screen.getByAltText('user_img');
    expect(userImage).toBeInTheDocument();
  });

  test('renders user information text', () => {
    render(<UserProfile />);
    expect(screen.getByText('Hi Mark!')).toBeInTheDocument();
    expect(screen.getByText('#345-876')).toBeInTheDocument();
    expect(screen.getByText('Joined Feb 2025')).toBeInTheDocument();
  });

  test('renders campus button with correct text', () => {
    render(<UserProfile />);
    const campusBtn = screen.getByRole('button', { name: /Campus: /i });
    expect(campusBtn).toBeInTheDocument();
  });

  test('renders leaderboard position button with correct text', () => {
    render(<UserProfile />);
    const leaderboardBtn = screen.getByRole('button', { name: /Leaderboard Position:/i });
    expect(leaderboardBtn).toBeInTheDocument();
  });

  test('renders remaining tasks section with task buttons', () => {
    render(<UserProfile />);
    // Verify that the "Remaining Tasks:" label is present
    expect(screen.getByText(/Remaining Tasks:/i)).toBeInTheDocument();
    // Check for the two task buttons 
    const recycleTaskBtn = screen.getByTestId('recycle-task-btn');
    const bikeTaskBtn = screen.getByTestId('bike-task-btn');
    expect(recycleTaskBtn).toBeInTheDocument();
    expect(bikeTaskBtn).toBeInTheDocument();


    // Optionally verify that each task includes an arrow image
    const arrowImages = screen.getAllByAltText('arrow_img');
    expect(arrowImages.length).toBeGreaterThanOrEqual(2);
  });

  test('renders Footer component', () => {
    render(<UserProfile />);
    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });
});