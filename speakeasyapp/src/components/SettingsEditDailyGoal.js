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
import Clock from './assets/Clock.png';

// Settings edit daily goal component
const SettingsEditDailyGoal = () => {

    // Event handler function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission behavior
    };

    const navigate = useNavigate(); // Assign the `useNavigate` hook to the variable `navigate`

    return (
        <div className='mainpage-container'> {/* Main container */}
            <div className='white-rectangle-container'> {/* Container for top section */}
                <img src={Logo} alt="SpeakEasy" /> {/* Logo */}
                <h1>Welcome, _________!</h1> {/* Welcome message */}
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
                    </ul>
                </div>
                <div className='settings-container bottom-section'> {/* Settings container */}
                    <div className='left-of-settings-buttons-container'>
                        <div className='edit-daily-goal'>
                            <h2>Edit Daily Goal</h2>
                        </div>
                        <h3>How many minutes a day?</h3> {/* How Many Mins heading */}
                        <div className='select-container'> 
                            <img className='clock' src={Clock} alt="Time" /> {/* Clock icon */}
                            <select> {/* Time dropdown */}
                                <option value="10">10</option> 
                                <option value="20">20</option>
                                <option value="30">30</option>
                            </select>
                        </div>
                        <button className='edit-daily-goal-button' type="submit"onClick={() => navigate('/settingsEditDailyGoal')}>Submit</button> {/* Submit button */}
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

export default SettingsEditDailyGoal;