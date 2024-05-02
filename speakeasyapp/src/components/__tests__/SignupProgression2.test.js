import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import SignupProgression2 from '../SignupProgression2';

jest.mock('axios', () => ({
  put: jest.fn(),
}));

describe('SignupProgression2', () => {
  beforeEach(() => {
    localStorage.setItem('userID', '123');
    jest.clearAllMocks();
    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    localStorage.removeItem('userID');
    jest.restoreAllMocks();
  });

  test('renders SignupProgression2 component', () => {
    render(
      <Router>
        <SignupProgression2 />
      </Router>
    );

    expect(screen.getByText('I want to learn...')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveValue('Spanish');
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  test('handles language selection and form submission', async () => {
    axios.put.mockResolvedValueOnce({ data: {} });

    render(
      <Router>
        <SignupProgression2 />
      </Router>
    );

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'French' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith('http://localhost:3000/user/123/update', {
        languages: ['French'],
      });
    });
  });

  test('handles form submission without userID', async () => {
    axios.put.mockResolvedValueOnce({ data: {} });
    localStorage.removeItem('userID');

    render(
      <Router>
        <SignupProgression2 />
      </Router>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(axios.put).not.toHaveBeenCalled();
      expect(screen.getByText('User ID not found. Please sign in again.')).toBeInTheDocument();
    });
  });
});