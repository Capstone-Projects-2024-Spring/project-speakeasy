import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import SettingsEditDailyGoal from '../SettingsEditDailyGoal';

jest.mock('axios', () => ({
  get: jest.fn(),
  put: jest.fn(),
}));

describe('SettingsEditDailyGoal', () => {
  const mockUserData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    language: 'Spanish',
    dailyTarget: 10,
  };

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockUserData });
    localStorage.setItem('userID', '12345');
  });

  afterEach(() => {
    localStorage.removeItem('userID');
    jest.clearAllMocks();
  });

  test('renders SettingsEditDailyGoal component', async () => {
    render(
      <Router>
        <SettingsEditDailyGoal />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('Edit Daily Goal')).toBeInTheDocument();
      expect(screen.getByText('How many minutes a day?')).toBeInTheDocument();
      expect(screen.getByRole('combobox')).toHaveValue('10');
      expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    });
  });

  test('updates daily target on form submission', async () => {
    axios.put.mockResolvedValueOnce({ data: { ...mockUserData, dailyTarget: 30 } });

    render(
      <Router>
        <SettingsEditDailyGoal />
      </Router>
    );

    fireEvent.change(screen.getByRole('combobox'), { target: { value: '30' } });
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith('http://localhost:3000/user/12345/update', {
        dailyTarget: 30,
      });
    });
  });

  test('handles logout', async () => {
    render(
      <Router>
        <SettingsEditDailyGoal />
      </Router>
    );

    await waitFor(() => {
      const logoutButton = screen.getByRole('button', { name: 'Log Out' });
      logoutButton.click();
      expect(localStorage.getItem('userID')).toBeNull();
    });
  });
});