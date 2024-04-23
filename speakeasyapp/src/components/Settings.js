import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 
import './styles/MainPage.css'; 
import './styles/Settings.css'; 

import Logo from './assets/Logo.png'; 
import Help from './assets/Help.png'; 
import Book from './assets/Book.png'; 
import User from './assets/User.png'; 
import Settings from './assets/Settings.png'; 

// Settings component
const SettingsPage = () => {
    // State variables & their setter functions using useState hook
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Event handler functions to update state based on input changes
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };
    
    const handleNameChange = (event) => {
        setName(event.target.value);
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
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        // Log form data to the console
        console.log('Name:', name);
        console.log('Username:', username);
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('Confirm Password:', confirmPassword);
    };

    const navigate = useNavigate(); // Assign the `useNavigate` hook to the variable `navigate`

    const handleLogout = () => {
        localStorage.removeItem('userID');
        // Redirect to login route
        window.location.href = '/';
    };
    
    return (
        <div className='mainpage-container'> {/* Main container */}
            <div className='white-rectangle-container'> {/* Container for top section */}
                <img src={Logo} alt="SpeakEasy" /> {/* Logo */}
                <h1>Settings</h1> {/* Settings message */}
            </div>
            <div className='light-orange-rectangle'/>
            <div className='bottom-container'> {/* Container for bottom section */}
                <div className='navbar-container bottom-section'> {/* Navbar container */}
                    <ul>
                        <li>
                            <img src={Book} alt="Learn" /> {/* Learn icon */}
                            <Link to="/mainpage">Learn</Link> {/* Learn link */}
                        </li>
                        <li>
                            <img src={User} alt="Profile" /> {/* Profile icon */}
                            <Link to="/profile">Profile</Link> {/* Profile link */}
                        </li>
                        <li>
                            <img src={Settings} alt="Settings" /> {/* Settings icon */}
                            <Link to="/settings">Settings</Link> {/* Settings link */}
                        </li>
                        <li>
                            <img src={Help} alt="Help" /> {/* Help icon */}
                            <Link to="/help">Help</Link> {/* Help link */}
                        </li>
                        <li><button onClick={handleLogout}>Log Out</button></li> {/* Log out button */}
                    </ul>
                </div>
                <div className='settings-container bottom-section'> {/* Settings container */}
                    <div className='left-of-settings-buttons-container'>
                        <div className='account'>
                            <h2>Account</h2>
                        </div>
                        <form onSubmit={handleSubmit} className="update-form"> {/* Login form */}
                            <div className='field'> {/* Form field for name */}
                                <label>Name:</label> {/* Label for name input */}
                                <div className='input'>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={handleNameChange}
                                        required
                                    /> {/* Input field for name */}
                                </div>
                            </div>
                            <div className='field'> {/* Form field for username */}
                                <label>Username:</label> {/* Label for username input */}
                                <div className='input'>
                                    <input
                                        type="username"
                                        value={username}
                                        onChange={handleUsernameChange}
                                        required
                                    /> {/* Input field for email */}
                                </div>
                            </div>
                            <div className='field'> {/* Form field for email */}
                                <label>Email:</label> {/* Label for email input */}
                                <div className='input'>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={handleEmailChange}
                                        required
                                    /> {/* Input field for email */}
                                </div>
                            </div>
                            <div className='field'> {/* Form field for password */}
                                <label>Password:</label> {/* Label for password input */}
                                <div className='input'>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                        required
                                    /> {/* Input field for password */}
                                </div>
                            </div>
                            <div className='field'> {/* Form field for confirming password */}
                                <label>Confirm Password:</label> {/* Label for confirming password input */}
                                <div className='input'>
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={handleConfirmPasswordChange}
                                        required
                                    /> {/* Input field for confirming password */}
                                </div>
                            </div>
                        </form>
                        <button className='update-button' type="submit"onClick={() => navigate('/settings')}>Update</button> {/* Update button */}
                    </div>
                    <div className='settings-buttons-container'> {/* Container for settings buttons */}
                        <button className='settings-buttons' type="submit"onClick={() => navigate('/settings')}>Account</button> {/* Account button */}
                        <button className='settings-buttons' type="submit"onClick={() => navigate('/settingsEditDailyGoal')}>Edit Daily Goals</button> {/* Edit Daily Goals button */}
                        <button className='settings-buttons' type="submit"onClick={() => navigate('/settingsManageCourses')}>Manage Courses</button> {/* Manage Courses button */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;