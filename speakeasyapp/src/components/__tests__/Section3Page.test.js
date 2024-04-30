import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import Section3Page from '../Section3Page.js';

jest.mock('axios');

describe('Section3Page', () => {
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

  test('renders Section3Page component', async () => {
    render(
      <Router>
        <Section3Page />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('Role Playing')).toBeInTheDocument();
      expect(screen.getByAltText('SpeakEasy')).toBeInTheDocument();
      expect(screen.getByText("Welcome to roleplaying")).toBeInTheDocument();
    });
  });

  test('sends message to bot and displays response', async () => {
    const mockResponse = [
      { text: "¡Hola! Estoy emocionado de practicar contigo. (Hello! I am excited to practice with you.)", sender: "bot" },
      { text: "What is the capital of France?", sender: "user" }
    ];
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ messages: mockResponse })
      })
    );

    render(
      <Router>
        <Section3Page />
      </Router>
    );

    const inputField = screen.getByPlaceholderText("Type your message here...");
    const sendButton = screen.getByRole("button", { name: "Send" });

    fireEvent.change(inputField, { target: { value: "What is the capital of France?" } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText("What is the capital of France?")).toBeInTheDocument();
      expect(screen.getByText("¡Hola! Estoy emocionado de practicar contigo. (Hello! I am excited to practice with you.)")).toBeInTheDocument();
    });
  });

  test('handles logout', async () => {
    render(
      <Router>
        <Section3Page />
      </Router>
    );

    await waitFor(() => {
      const logoutButton = screen.getByRole('button', { name: 'Log Out' });
      logoutButton.click();
      expect(localStorage.getItem('userID')).toBeNull();
    });
  });
});