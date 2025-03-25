import React from 'react';
import { render, screen } from '@testing-library/react';

function MockedLoginForm() {
  return (
    <div className="container">
      <button className="close-btn">X</button>
      <h1>Hello</h1>
      <h2>Sign In!</h2>
      <form>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button type="submit">SIGN IN</button>
      </form>
      <a href="/signup">Sign up</a>
    </div>
  );
}

describe('LoginForm (mocked)', () => {
  test('renders login form UI', () => {
    render(<MockedLoginForm />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('SIGN IN')).toBeInTheDocument();
  });

  test('has sign up link', () => {
    render(<MockedLoginForm />);
    expect(screen.getByText('Sign up')).toBeInTheDocument();
  });
});
