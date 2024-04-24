import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import Section2Page from '../Section2Page.js';

jest.mock('axios');

describe('Section2Page', () => {
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

  test('renders Section2Page component', async () => {
    render(
      <Router>
        <Section2Page />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('Translator')).toBeInTheDocument();
      expect(screen.getByAltText('SpeakEasy')).toBeInTheDocument();
      expect(screen.getByText("Welcome to translator from english")).toBeInTheDocument();
    });
  });

  test('sends message to bot and displays response', async () => {
    const mockResponse = [
      { text: "Hola, ¿cómo puedo ayudarte hoy?", sender: "bot" },
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
        <Section2Page />
      </Router>
    );

    const inputField = screen.getByPlaceholderText("Type your message here...");
    const sendButton = screen.getByRole("button", { name: "Send" });

    fireEvent.change(inputField, { target: { value: "What is the capital of France?" } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText("What is the capital of France?")).toBeInTheDocument();
      expect(screen.getByText("Hola, ¿cómo puedo ayudarte hoy?")).toBeInTheDocument();
    });
  });

  test('handles logout', async () => {
    render(
      <Router>
        <Section2Page />
      </Router>
    );

    await waitFor(() => {
      const logoutButton = screen.getByRole('button', { name: 'Log Out' });
      logoutButton.click();
      expect(localStorage.getItem('userID')).toBeNull();
    });
  });
});