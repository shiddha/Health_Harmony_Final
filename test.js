import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login'; // Assuming Login component is imported
import Signup from './Signup'; // Assuming Signup component is imported

describe('Login Component', () => {
  test('renders login form correctly', () => {
    const { getByLabelText, getByText } = render(<Login />);
    expect(getByLabelText('Username/Email')).toBeInTheDocument();
    expect(getByLabelText('Password')).toBeInTheDocument();
    expect(getByText('Login')).toBeInTheDocument();
  });

  test('allows user to login with valid credentials', async () => {
    const { getByLabelText, getByText } = render(<Login />);
    fireEvent.change(getByLabelText('Username/Email'), { target: { value: 'testuser' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password' } });
    fireEvent.click(getByText('Login'));
    await waitFor(() => expect(getByText('Welcome, testuser')).toBeInTheDocument());
  });

  // Add more test cases for invalid credentials, empty fields, etc.
});

describe('Signup Component', () => {
  test('renders signup form correctly', () => {
    const { getByLabelText, getByText } = render(<Signup />);
    expect(getByLabelText('Username')).toBeInTheDocument();
    expect(getByLabelText('Email')).toBeInTheDocument();
    expect(getByLabelText('Password')).toBeInTheDocument();
    expect(getByLabelText('Confirm Password')).toBeInTheDocument();
    expect(getByText('Signup')).toBeInTheDocument();
  });

  test('allows user to signup with valid credentials', async () => {
    const { getByLabelText, getByText } = render(<Signup />);
    fireEvent.change(getByLabelText('Username'), { target: { value: 'newuser' } });
    fireEvent.change(getByLabelText('Email'), { target: { value: 'newuser@example.com' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password' } });
    fireEvent.change(getByLabelText('Confirm Password'), { target: { value: 'password' } });
    fireEvent.click(getByText('Signup'));
    await waitFor(() => expect(getByText('Welcome, newuser')).toBeInTheDocument());
  });

  // Add more test cases for invalid credentials, password mismatch, etc.
});
