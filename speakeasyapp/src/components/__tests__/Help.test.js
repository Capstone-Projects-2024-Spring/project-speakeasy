import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import HelpPage from '../Help.js'; 

describe('HelpPage Component', () => {
    test('renders welcome message', () => {
        render(<Router><HelpPage /></Router>);
        const welcomeMessage = screen.getByText('Welcome, _________!');
        expect(welcomeMessage).toBeInTheDocument();
    });

    test('renders help text', () => {
        render(<Router><HelpPage /></Router>);
        const helpText = screen.getByText('Help Page');
        expect(helpText).toBeInTheDocument();
        expect(screen.getByText('Go to "Learn" to check your progress on the language you are learning. You can access the language tutor bot from there!')).toBeInTheDocument();
        expect(screen.getByText('Go to "Profile" to see your profile page!')).toBeInTheDocument();
        expect(screen.getByText('Go to "Settings" to further customize your experience using SpeakEasy! You can edit your account details, daily goal, and manage your courses!')).toBeInTheDocument();
    });

    test('renders navigation links correctly', () => {
        render(<Router><HelpPage /></Router>);
        expect(screen.getByText('Learn')).toBeInTheDocument();
        expect(screen.getByText('Profile')).toBeInTheDocument();
        expect(screen.getByText('Settings')).toBeInTheDocument();
        expect(screen.getByText('Help')).toBeInTheDocument();
    });

    test('images have correct alt text', () => {
        render(<Router><HelpPage /></Router>);
        expect(screen.getByAltText('SpeakEasy')).toBeInTheDocument();
        expect(screen.getByAltText('Learn')).toBeInTheDocument();
        expect(screen.getByAltText('Profile')).toBeInTheDocument();
        expect(screen.getByAltText('Settings')).toBeInTheDocument();
        expect(screen.getByAltText('Help')).toBeInTheDocument();
    });

});
