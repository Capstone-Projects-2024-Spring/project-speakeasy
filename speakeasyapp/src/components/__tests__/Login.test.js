import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../Login'; 

describe('Login Component', () => {

    test('renders login form elements', () => {
        render(<Router><Login /></Router>);
        expect(screen.getByText('Login')).toBeInTheDocument();
        expect(screen.getByLabelText('Email:')).toBeInTheDocument();
        expect(screen.getByLabelText('Password:')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Log in' })).toBeInTheDocument();
        expect(screen.getByText('Need an account?')).toBeInTheDocument();
    });

    test('updates state variables when input fields are changed', () => {
        render(<Router><Login /></Router>);
        fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'password123' } });
        expect(screen.getByLabelText('Email:')).toHaveValue('test@example.com');
        expect(screen.getByLabelText('Password:')).toHaveValue('password123');
    });

});
