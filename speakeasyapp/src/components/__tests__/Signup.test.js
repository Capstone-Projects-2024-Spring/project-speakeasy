import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import Signup from '../Signup';

jest.mock('axios');

describe('Signup', () => {

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(window, 'alert').mockImplementation(() => {});

  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
  
  test('renders Signup component', () => {
    render(
      <Router>
        <Signup />
      </Router>
    );

    expect(screen.getByRole('heading', { name: 'Sign Up' })).toBeInTheDocument();
    expect(screen.getByLabelText('First Name:')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name:')).toBeInTheDocument();
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign Up' })).toBeInTheDocument();
    expect(screen.getByText('Already have an account?')).toBeInTheDocument();
  });

  test('handles form submission with valid data', async () => {
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
        <Signup />
      </Router>
    );

    fireEvent.change(screen.getByLabelText('First Name:'), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByLabelText('Last Name:'), {
      target: { value: 'Doe' },
    });
    fireEvent.change(screen.getByLabelText('Email:'), {
      target: { value: 'johndoe@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password:'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText('Confirm Password:'), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/user/register', {
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        password: 'password123',
      });
      expect(localStorage.getItem('userID')).toBe('123');
    });
  });

  test('handles form submission with mismatched passwords', async () => {
    render(
      <Router>
        <Signup />
      </Router>
    );

    fireEvent.change(screen.getByLabelText('Password:'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText('Confirm Password:'), {
      target: { value: 'password456' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }));

    await waitFor(() => {
      expect(axios.post).not.toHaveBeenCalled();
    });
  });
});