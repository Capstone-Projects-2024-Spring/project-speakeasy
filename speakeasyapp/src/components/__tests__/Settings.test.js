import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import SettingsPage from '../Settings';

jest.mock('axios');

describe('SettingsPage', () => {
  const mockUserData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    language: 'English',
    dailyTarget: 30,
  };

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockUserData });
    localStorage.setItem('userID', '123');
    jest.clearAllMocks();
  });

  afterEach(() => {
    localStorage.removeItem('userID');
  });

  test('renders SettingsPage component', async () => {
    render(
      <Router>
        <SettingsPage />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('Welcome, John!')).toBeInTheDocument();
      expect(screen.getByLabelText('Name:')).toBeInTheDocument();
      expect(screen.getByLabelText('Username:')).toBeInTheDocument();
      expect(screen.getByLabelText('Email:')).toBeInTheDocument();
      expect(screen.getByLabelText('Password:')).toBeInTheDocument();
      expect(screen.getByLabelText('Confirm Password:')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Update' })).toBeInTheDocument();
    });
  });

  test('handles logout', async () => {
    render(
      <Router>
        <SettingsPage />
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
        <SettingsPage />
      </Router>
    );

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/user/123');
    });
  });
});