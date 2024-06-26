import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import Axios from 'axios';
import './styles/LoginSignup.css';

// Login component
const Login = () => { 
    // State variables & their setter functions using useState hook
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Event handler functions to update state based on input changes
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    // Event handler function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        // Log email and password to the console
        const user = {
            email: email,
            password: password,
        }

        console.log('Email:', email);
        console.log('Password:', password);

        // Check backend
        Axios.post("http://localhost:3000/user/login", user)
            .then(res => {
                console.log(res.data);
                // Optionally clear form and handle success
                setEmail('');
                setPassword('');
                
                if(res.data && res.data.user._id) {
                    localStorage.setItem('userID', res.data.user._id);
                    localStorage.setItem('loginTime', new Date().getTime());
                    console.log('Login successful, userID and login time stored in localStorage.');
                    navigate('/mainpage'); // Navigate on successful login
                } else {
                    console.error('Login response did not include userID.');
                }
            })
            .catch(error => {
                console.log(error);
                if (error.response && error.response.status === 400) {
                    setErrorMessage('Invalid email or password.');
                  } else {
                    setErrorMessage('An error occurred. Please try again.');
                  }
            });
        }

    const navigate = useNavigate(); // Assign the `useNavigate` hook to the variable `navigate`

    return (
        <div className="login-container"> {/* Container for Login form */}
            <h2>Login</h2> {/* Login heading */}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <form onSubmit={handleSubmit} className="login-form"> {/* Login form */}
                <div> {/* Form field for email */}
                    <label htmlFor="email">Email:</label> {/* Label for email input */}
                    <input
                        id="email"
                        type="text"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    /> {/* Input field for email */}
                </div>
                <div> {/* Form field for password */}
                <label htmlFor="password">Password:</label> {/* Label for password input */}
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    /> {/* Input field for password */}
                </div>
                <button type="submit">Log in</button> {/* Submit button */}
            </form>
            <div> {/* Additional text for navigating to signup page */}
                <p>Need an account? <Link to="/signup">Sign Up</Link></p> {/* Link to signup page */}
            </div>
        </div>
    );
};

export default Login; 