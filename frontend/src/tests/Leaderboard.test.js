// Leaderboard.test.jsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Leaderboard from '../pages/Leaderboard';

// Mock the Footer component as you did before
jest.mock('../components/Footer', () => () => <div>Footer Mock</div>);

describe('Leaderboard Component', () => {
  // Test 1: Component should render without crashing
  test('renders Leaderboard component', () => {
    render(<Leaderboard />);
    expect(screen.getByText('Leaderboard')).toBeInTheDocument();
  });

  // Test 2: Default tab is 'Everyone'
  test('displays Everyone tab by default', () => {
    render(<Leaderboard />);
    expect(screen.getByText('James')).toBeInTheDocument();
    expect(screen.getByText('Timothy')).toBeInTheDocument();
    expect(screen.getByText('Mark (You)')).toBeInTheDocument();
  });

  // Test 3: Switching to 'Friends' tab
  test('displays Friends tab when clicked', () => {
    render(<Leaderboard />);
    fireEvent.click(screen.getByText('Friends'));
    expect(screen.queryByText('James')).not.toBeInTheDocument();
    expect(screen.queryByText('Timothy')).not.toBeInTheDocument();
    expect(screen.getByText('Mark (You)')).toBeInTheDocument();
    expect(screen.getByText('Mohammed')).toBeInTheDocument();
    expect(screen.getByText('Sophie')).toBeInTheDocument();
  });

  // Test 4: Active tab styling
  test('applies active class to the selected tab', () => {
    render(<Leaderboard />);
    const everyoneTab = screen.getByText('Everyone');
    const friendsTab = screen.getByText('Friends');

    // Initially, 'Everyone' should be active
    expect(everyoneTab).toHaveClass('active');
    expect(friendsTab).not.toHaveClass('active');

    // Click on 'Friends' tab
    fireEvent.click(friendsTab);
    expect(everyoneTab).not.toHaveClass('active');
    expect(friendsTab).toHaveClass('active');
  });

  // Test 5: User Images and Names
  test('renders user images and names correctly', () => {
    render(<Leaderboard />);
    expect(screen.getByAltText('Mark (You)')).toBeInTheDocument();
    expect(screen.getByAltText('Mohammed')).toBeInTheDocument();
    expect(screen.getByAltText('Sophie')).toBeInTheDocument();
  });

  // Test 6: Friend Code Input and Button
  test('displays friend code input and button', () => {
    render(<Leaderboard />);
    expect(screen.getByPlaceholderText('Enter Friend Code')).toBeInTheDocument();
    expect(screen.getByText('Add Friend')).toBeInTheDocument();
  });
});
