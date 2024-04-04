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
            alert('Passwords do not match.'); // Update to use setErrorMessage
            return;
        }

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
            navigate('/signupProgression2'); // Navigate on successful signup
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
            <form onSubmit={handleSubmit} className="signup-form">
                <div>
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="firstName"
                        value={user.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="lastName"
                        value={user.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input
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