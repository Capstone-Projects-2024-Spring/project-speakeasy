import React, { useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import './styles/LoginSignup.css'; 

// Signup component
const Signup = () => { 
    // State variables & their setter functions using useState hook
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Event handler functions to update state based on input changes
    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    // Event handler function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        // Check if password matches
        if (password !== confirmPassword) {
            alert('Passwords do not match.'); // Replace this with a more user-friendly message or state
            return; // Exit early if passwords do not match
        }

        // Check if email already exists
        const existingUser = await Axios.get("http://localhost:3000/user/checkEmail/$(email)");
        console.log(existingUser.data);
        if(existingUser.data && existingUser.data.exists) {
            alert("Email already exists. Please use a different email.");
            return;
        }

        const user = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
        }

        // Log form data to the console
        console.log('First Name:', firstName);
        console.log('Last Name:', lastName);
        console.log('Email:', email);
        console.log('Password:', password); // MUST HANDLE SECURELY LATER

        // Send to backend
        Axios.post("http://localhost:3000/user/register", user)
            .then(res => console.log(res.data));

        // On successful signup, navigate to the next step or login page
        navigate('/signupProgression2');
    };

    const navigate = useNavigate(); // Assign the `useNavigate` hook to the variable `navigate`

    return (
        <div className="signup-container"> {/* Container for Signup form */}
            <h2>Sign Up</h2> {/* Signup heading */}
            <form onSubmit={handleSubmit} className="signup-form"> {/* Signup form */}
                <div> {/* Form field for first name */}
                    <label>First Name:</label> {/* Label for name input */}
                    <input
                      type="text"
                      value={firstName}
                      onChange={handleFirstNameChange}
                      required
                    /> {/* Input field for name */}
                </div>
                <div> {/* Form field for last name */}
                    <label>Last Name:</label> {/* Label for name input */}
                    <input
                      type="text"
                      value={lastName}
                      onChange={handleLastNameChange}
                      required
                    /> {/* Input field for name */}
                </div>
                <div> {/* Form field for email */}
                    <label>Email:</label> {/* Label for email input */}
                    <input
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      required
                    /> {/* Input field for email */}
                </div>
                <div> {/* Form field for password */}
                    <label>Password:</label> {/* Label for password input */}
                    <input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    /> {/* Input field for password */}
                </div>
                <div> {/* Form field for confirming password */}
                    <label>Confirm Password:</label> {/* Label for confirming password input */}
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        required
                    /> {/* Input field for confirming password */}
                </div>
                <button type="submit">Sign Up</button> {/* Signup button */}
            </form>
            <div> {/* Additional text for navigating to login page */}
                <p>Already have an account? <Link to="/">Login</Link></p> {/* Link to login page */}
            </div>
        </div>
    );
};

export default Signup; // Export Signup component