import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import Profile from '../Profile.js';

jest.mock('axios');

describe('Profile', () => {
  const mockUserData = {
    firstName: 'John',
    lastName: 'Doe',
    languages: ['Spanish'],
    dailyTarget: 30,
  };

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockUserData });
    localStorage.setItem('userID', '12345');
  });

  afterEach(() => {
    localStorage.removeItem('userID');
    jest.clearAllMocks();
  });

  test('renders Profile component', async () => {
    render(
      <Router>
        <Profile />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('Welcome, John!')).toBeInTheDocument();
      expect(screen.getByAltText('SpeakEasy')).toBeInTheDocument();
      expect(screen.getByAltText('User')).toBeInTheDocument();
      expect(screen.getByAltText('Spanish Flag')).toHaveAttribute('src', '/Flags/spain.png');
      expect(screen.getByText('John is currently on a 100 day streak!')).toBeInTheDocument();
      expect(screen.getByText('John frequently learns past 7PM!')).toBeInTheDocument();
      expect(screen.getByText('John has searched over 500 words!')).toBeInTheDocument();
    });
  });

  test('handles logout', async () => {
    render(
      <Router>
        <Profile />
      </Router>
    );

    await waitFor(() => {
      const logoutButton = screen.getByRole('button', { name: 'Log Out' });
      logoutButton.click();
      expect(localStorage.getItem('userID')).toBeNull();
    });
  });

  test('fetches user data on mount', async () => {
    render(
      <Router>
        <Profile />
      </Router>
    );

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/user/12345');
    });
  });
});