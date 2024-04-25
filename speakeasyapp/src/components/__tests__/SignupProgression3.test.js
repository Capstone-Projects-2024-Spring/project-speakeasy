import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import SignupProgression3 from '../SignupProgression3';

jest.mock('axios');

describe('SignupProgression3', () => {
  beforeEach(() => {
    localStorage.setItem('userID', '123');
    jest.clearAllMocks();
  });

  afterEach(() => {
    localStorage.removeItem('userID');
  });

  test('renders SignupProgression3 component', () => {
    render(
      <Router>
        <SignupProgression3 />
      </Router>
    );

    expect(screen.getByText('How many minutes a day?')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveValue('10');
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  test('handles daily target selection and form submission', async () => {
    axios.put = jest.fn().mockResolvedValueOnce({ data: {} });

    render(
      <Router>
        <SignupProgression3 />
      </Router>
    );

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: '20' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith('http://localhost:3000/user/123/update', {
        dailyTarget: '20',
      });
    });
  });

  test('handles form submission without userID', async () => {
    axios.put = jest.fn();
    localStorage.removeItem('userID');

    render(
      <Router>
        <SignupProgression3 />
      </Router>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(axios.put).not.toHaveBeenCalled();
      expect(screen.getByText('User ID not found. Please sign in again.')).toBeInTheDocument();
    });
  });
});