import React, { useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import './styles/LoginSignup.css'; 

// Signup component
const Signup = () => { 
    // State variables & their setter functions using useState hook
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errorMessage, setErrorMessage] = useState('');

    // Event handler functions to update state based on input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    // Event handler function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Access properties from the user state object
        if (user.password !== user.confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }

        setErrorMessage('');

        // Send to backend
        Axios.post("http://localhost:3000/user/register", {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
        })
        .then(res => {
            console.log(res.data);
            // Optionally clear form and handle success
            setUser({ firstName: '', lastName: '', email: '', password: '', confirmPassword: ''});
            if(res.data && res.data.user._id) {
                localStorage.setItem('userID', res.data.user._id);
                localStorage.setItem('loginTime', new Date().getTime());
                console.log('Login successful, userID stored in localStorage.');
                navigate('/signupProgression2'); // Navigate on successful signup
            } else {
                console.error('Login response did not include userID.');
            }
        })
        .catch(error => {
            console.log(error);
            if (error.response) {
                alert(error.response.data);
            } else {
                alert('An error occurred. Please try again.');
            }
        });

    };

    const navigate = useNavigate(); // Assign the `useNavigate` hook to the variable `navigate`

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <form onSubmit={handleSubmit} className="signup-form">
                <div>
                <label htmlFor="firstName">First Name:</label>
                    <input
                        id="firstName"
                        type="text"
                        name="firstName"
                        value={user.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                <label htmlFor="lastName">Last Name:</label>
                    <input
                        id="lastName"
                        type="text"
                        name="lastName"
                        value={user.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        id="confirmPassword"
                        type="password"
                        name="confirmPassword"
                        value={user.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Sign Up</button>

            </form>
            <div>
                <p>Already have an account? <Link to="/">Login</Link></p>
            </div>
        </div>
    );
};

export default Signup; // Export Signup component