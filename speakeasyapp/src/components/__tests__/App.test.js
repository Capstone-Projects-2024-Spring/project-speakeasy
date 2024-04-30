import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../../App';

jest.mock('../About.js', () => () => <div data-testid="about">Mocked About</div>);
jest.mock('../Login.js', () => () => <div data-testid="login">Mocked Login</div>);
jest.mock('../Signup.js', () => () => <div data-testid="signup">Mocked Signup</div>);
jest.mock('../MainPage.js', () => () => <div data-testid="mainpage">Mocked MainPage</div>);
jest.mock('../SignupProgression2.js');
jest.mock('../SignupProgression3.js');
jest.mock('../Profile.js');
jest.mock('../Settings.js');
jest.mock('../SettingsEditDailyGoal.js');
jest.mock('../SettingsManageCourses.js');
jest.mock('../Help.js');
jest.mock('../Section1Page.js');
jest.mock('../Section2Page.js');
jest.mock('../Section3Page.js');
jest.mock('../Section4Page.js');

describe('App', () => {
    test('renders About and Login components on the root path', () => {
      render(<App />);
  
      expect(screen.getByTestId('about')).toBeInTheDocument();
      expect(screen.getByTestId('login')).toBeInTheDocument();
    });
  
    test('renders About and Signup components on the signup path', () => {
      window.history.pushState({}, '', '/signup');
      render(<App />);
  
      expect(screen.getByTestId('about')).toBeInTheDocument();
      expect(screen.getByTestId('signup')).toBeInTheDocument();
    });
  
    test('renders MainPage component on the mainpage path', () => {
      window.history.pushState({}, '', '/mainpage');
      render(<App />);
  
      expect(screen.getByTestId('mainpage')).toBeInTheDocument();
    });
  });