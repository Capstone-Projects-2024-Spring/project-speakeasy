import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './styles/MainPage.css'; 
import './styles/Settings.css';
import Axios from 'axios';


import Logo from './assets/Logo.png'; 
import Help from './assets/Help.png'; 
import Book from './assets/Book.png'; 
import User from './assets/User.png'; 
import Settings from './assets/Settings.png'; 

// Settings component
const SettingsPage = () => {
    // State variables & their setter functions using useState hook
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
    });
    
      const userID = localStorage.getItem('userID');
    
      useEffect(() => {
        Axios.get(`http://localhost:3000/user/${userID}`)
          .then(response => {
            setUser(response.data);
            setName(`${response.data.firstName} ${response.data.lastName}`);
          })
          .catch(error => {
            console.error('Error fetching user data:', error);
          });
      }, [userID]);

    // Event handler functions to update state based on input change 
    
    const handleNameChange = (event) => {
        setName(event.target.value);
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
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        const [firstName, lastName] = name.split(' ');
        Axios.put(`http://localhost:3000/user/${userID}/update`, {
            firstName,
            lastName,
            password,
        })
        .then(response => {
            console.log('Profile updated successfully:', response.data);
            setUser(response.data.user.profile);
            alert('Profile updated successfully');
        })
        .catch(error => {
            console.error('Error updating profile:', error);
            alert('Error updating profile');
        });
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
                <h1>Welcome, {user.firstName}!</h1> {/* Welcome message */}
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
                        <form onSubmit={handleSubmit} className="update-form">
                            <div className='field'> {/* Form field for name */}
                            <label htmlFor="name">Name:</label> {/* Label for name input */}
                                <div className='input'>
                                    <input
                                        id="name"
                                        type="text"
                                        value={name}
                                        onChange={handleNameChange}
                                        required
                                    /> {/* Input field for name */}
                                </div>
                            </div>
                            <div className='field'> {/* Form field for password */}
                            <label htmlFor="password">Password:</label> {/* Label for password input */}
                                <div className='input'>
                                    <input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                        required
                                    /> {/* Input field for password */}
                                </div>
                            </div>
                            <div className='field'> {/* Form field for confirming password */}
                            <label htmlFor="confirmPassword">Confirm Password:</label> {/* Label for confirming password input */}
                                <div className='input'>
                                    <input
                                        id="confirmPassword"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={handleConfirmPasswordChange}
                                        required
                                    /> {/* Input field for confirming password */}
                                </div>
                            </div>
                            <button className='update-button' type="submit">Update</button> {/* Update button */}
                        </form>
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