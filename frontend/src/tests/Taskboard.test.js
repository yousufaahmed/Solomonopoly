// Written by Aleem Abbas-Hussain

// Taskboard.test.jsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Taskboard from '../pages/Taskboard';

// Mock the Footer component to isolate testing to Taskboard
jest.mock('../components/Footer', () => () => <div>Footer Mock</div>);

describe('Taskboard Component', () => {
  // Test 1: Component should render without crashing
  test('renders Taskboard component', () => {
    render(<Taskboard />);
    expect(screen.getByText('Remaining Tasks')).toBeInTheDocument();
    expect(screen.getByText('All tasks remaining for this week')).toBeInTheDocument();
  });

  // Test 2: Dynamically check for checkmarks next to completed tasks
  test('displays checkmark for completed tasks', () => {
    render(<Taskboard />);

    // Get all task cards
    const taskCards = document.querySelectorAll('.task-card');

    taskCards.forEach((taskCard) => {
      const progressBar = taskCard.querySelector('.task-progress-bar');
      const endText = taskCard.querySelector('.task-end-text');

      // Check if the progress bar is 100% width
      const isCompleted = progressBar.style.width === '100%';

      // If completed, check for a checkmark
      if (isCompleted) {
        expect(endText).toHaveTextContent('✔');
      }
      // If not completed, check that it does NOT have a checkmark
      else {
        expect(endText).not.toHaveTextContent('✔');
      }
    });
  });

  // Test 3: Footer component is displayed
  test('displays the footer component', () => {
    render(<Taskboard />);
    expect(screen.getByText('Footer Mock')).toBeInTheDocument();
  });
});
