import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import axios from 'axios';
import MainPage from '../MainPage.js';

jest.mock('axios');

describe('MainPage', () => {
  const mockUserData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    language: 'Spanish',
    dailyTarget: 30,
  };

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockUserData });
    localStorage.setItem('userID', '12345');
    localStorage.setItem('loginTime', '1680000000000'); // Example login time
  });

  afterEach(() => {
    localStorage.removeItem('userID');
    localStorage.removeItem('loginTime');
    jest.clearAllMocks();
  });

  test('renders MainPage component', async () => {
    render(
      <Router>
        <MainPage />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('Welcome, John!')).toBeInTheDocument();
      expect(screen.getByAltText('SpeakEasy')).toBeInTheDocument();
      expect(screen.getByText('Chat Room')).toBeInTheDocument();
      expect(screen.getByText('Translator')).toBeInTheDocument();
      expect(screen.getByText('Role Playing')).toBeInTheDocument();
      expect(screen.getByText('Vocab Practice')).toBeInTheDocument();
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
  });

  test('handles logout', async () => {
    render(
      <Router>
        <MainPage />
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
        <MainPage />
      </Router>
    );

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/user/12345');
    });
  });

  test('navigates to sections', async () => {
    render(
      <Router>
        <MainPage />
      </Router>
    );

    await waitFor(() => {
      const chatRoomLink = screen.getByRole('link', { name: 'Chat Room' });
      const translatorLink = screen.getByRole('link', { name: 'Translator' });
      const rolePlayingLink = screen.getByRole('link', { name: 'Role Playing' });
      const vocabPracticeLink = screen.getByRole('link', { name: 'Vocab Practice' });

      expect(chatRoomLink).toHaveAttribute('href', '/section1');
      expect(translatorLink).toHaveAttribute('href', '/section2');
      expect(rolePlayingLink).toHaveAttribute('href', '/section3');
      expect(vocabPracticeLink).toHaveAttribute('href', '/section4');
    });
  });
});