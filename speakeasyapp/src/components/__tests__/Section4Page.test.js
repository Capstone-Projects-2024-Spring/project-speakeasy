import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import Section4Page from '../Section4Page.js';

jest.mock('axios');

describe('Section4Page', () => {
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

  test('renders Section4Page component', async () => {
    render(
      <Router>
        <Section4Page />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('Vocab Practice')).toBeInTheDocument();
      expect(screen.getByAltText('SpeakEasy')).toBeInTheDocument();
      expect(screen.getByText("Welcome to Vocab Practice")).toBeInTheDocument();
    });
  });

  test.skip('sends message to bot and displays flashcards', async () => {
    const mockResponse = [
      { text: "1. perro - dog\n2. gato - cat\n3. casa - house\n4. coche - car\n5. libro - book\n6. mesa - table\n7. silla - chair\n8. ventana - window\n9. puerta - door\n10. lápiz - pencil", sender: "bot" },
      { text: "Create flashcards in Spanish", sender: "user" }
    ];
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ messages: mockResponse })
      })
    );

    render(
      <Router>
        <Section4Page />
      </Router>
    );

    const inputField = screen.getByPlaceholderText("Type your message here...");
    const sendButton = screen.getByRole("button", { name: "Send" });

    fireEvent.change(inputField, { target: { value: "Create flashcards in Spanish" } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText("Create flashcards in Spanish")).toBeInTheDocument();
      expect(screen.getByText("1. perro - dog")).toBeInTheDocument();
      expect(screen.getByText("2. gato - cat")).toBeInTheDocument();
    });
  });

  test('handles logout', async () => {
    render(
      <Router>
        <Section4Page />
      </Router>
    );

    await waitFor(() => {
      const logoutButton = screen.getByRole('button', { name: 'Log Out' });
      logoutButton.click();
      expect(localStorage.getItem('userID')).toBeNull();
    });
  });
});