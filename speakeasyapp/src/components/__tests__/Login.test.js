import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import Login from '../Login';

jest.mock('axios');
jest.spyOn(window, 'alert').mockImplementation(() => {});


describe('Login', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders Login component', () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Log in' })).toBeInTheDocument();
    expect(screen.getByText('Need an account?')).toBeInTheDocument();
  });

  test('handles form submission with valid credentials', async () => {
    const mockResponse = {
      data: {
        user: {
          _id: '123',
        },
      },
    };
    axios.post.mockResolvedValueOnce(mockResponse);

    render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.change(screen.getByLabelText('Email:'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password:'), {
      target: { value: 'password' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Log in' }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/user/login', {
        email: 'test@example.com',
        password: 'password',
      });
      expect(localStorage.getItem('userID')).toBe('123');
    });
  });

  test('handles form submission with invalid credentials', async () => {
    const mockError = {
      response: {
        status: 400,
      },
    };
    axios.post.mockRejectedValueOnce(mockError);

    render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.change(screen.getByLabelText('Email:'), {
      target: { value: 'invalid@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password:'), {
      target: { value: 'invalidpassword' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Log in' }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/user/login', {
        email: 'invalid@example.com',
        password: 'invalidpassword',
      });
      expect(screen.getByText('Invalid email or password.')).toBeInTheDocument();
    });
  });
});