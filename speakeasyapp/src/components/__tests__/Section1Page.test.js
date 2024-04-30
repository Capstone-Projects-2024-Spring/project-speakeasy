import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Section1Page from '../Section1Page.js';

jest.mock('axios');

describe('Section1Page', () => {
  beforeEach(() => {
    localStorage.setItem('userID', '12345');
  });

  afterEach(() => {
    localStorage.removeItem('userID');
  });

  test('renders Section1Page component', async () => {
    render(
      <Router>
        <Section1Page />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('Chat Room')).toBeInTheDocument();
      expect(screen.getByAltText('SpeakEasy')).toBeInTheDocument();
      expect(screen.getByText("Hello! what would you like to know?")).toBeInTheDocument();
    });
  });

  test('sends message to bot and displays response', async () => {
    const mockResponse = [
      { text: "Hello, how can I assist you today?", sender: "bot" },
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
        <Section1Page />
      </Router>
    );

    const inputField = screen.getByPlaceholderText("Type your message here...");
    const sendButton = screen.getByRole("button", { name: "Send" });

    fireEvent.change(inputField, { target: { value: "What is the capital of France?" } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText("What is the capital of France?")).toBeInTheDocument();
      expect(screen.getByText("Hello, how can I assist you today?")).toBeInTheDocument();
    });
  });

  test('handles logout', async () => {
    render(
      <Router>
        <Section1Page />
      </Router>
    );

    await waitFor(() => {
      const logoutButton = screen.getByRole('button', { name: 'Log Out' });
      logoutButton.click();
      expect(localStorage.getItem('userID')).toBeNull();
    });
  });
});