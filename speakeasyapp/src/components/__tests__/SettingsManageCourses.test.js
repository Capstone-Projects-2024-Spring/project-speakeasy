import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import SettingsManageCourses from '../SettingsManageCourses';

jest.mock('axios', () => ({
  get: jest.fn(),
  put: jest.fn(),
}));

describe('SettingsManageCourses', () => {
  const mockUserData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    languages: ['Spanish'],
    dailyTarget: 20,
  };

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockUserData });
    localStorage.setItem('userID', '12345');
  });

  afterEach(() => {
    localStorage.removeItem('userID');
    jest.clearAllMocks();
  });

  test('renders SettingsManageCourses component', async () => {
    render(
      <Router>
        <SettingsManageCourses />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Manage Courses' })).toBeInTheDocument();
      expect(screen.getByText('Current Language:')).toBeInTheDocument();
      expect(screen.getByText('Spanish')).toBeInTheDocument();
      expect(screen.getByText('Select New Language:')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Update Language' })).toBeInTheDocument();
    });
  });

  test('updates language on form submission', async () => {
    axios.put.mockResolvedValueOnce({ data: { ...mockUserData, languages: ['French'] } });

    render(
      <Router>
        <SettingsManageCourses />
      </Router>
    );

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'French' } });
    fireEvent.click(screen.getByRole('button', { name: 'Update Language' }));

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith('http://localhost:3000/user/12345/update', {
        languages: ['French'],
      });
    });
  });

  test('handles logout', async () => {
    render(
      <Router>
        <SettingsManageCourses />
      </Router>
    );

    await waitFor(() => {
      const logoutButton = screen.getByRole('button', { name: 'Log Out' });
      logoutButton.click();
      expect(localStorage.getItem('userID')).toBeNull();
    });
  });
});