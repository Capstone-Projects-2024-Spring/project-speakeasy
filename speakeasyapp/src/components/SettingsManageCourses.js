import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 
import './styles/MainPage.css'; 
import './styles/Settings.css'; 
import Logo from './assets/Logo.png'; 
import Help from './assets/Help.png'; 
import Book from './assets/Book.png'; 
import User from './assets/User.png'; 
import Settings from './assets/Settings.png'; 
import Axios from 'axios';

// Settings manage courses component
const SettingsManageCourses = () => {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        language: '',
        dailyTarget: 0,
    });
    const userID = localStorage.getItem('userID');

    useEffect(() => {
        Axios.get(`http://localhost:3000/user/${userID}`)
        .then(response => {
            setUser(response.data); // Update the user state with the fetched data
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
    }, [userID]);

    const languageToFlag = {
        Spanish: "spain.png",
        French: "france.png",
        English: "united-kingdom.png",
        Chinese: "china.png",
        // Add more mappings as necessary
    };

    const flagSrc = `/assets/Flags/${languageToFlag[user.language] || 'default.png'}`;

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
                        <div className='manage-courses-label'>
                            <h2>Manage Courses</h2>
                        </div>
                        <div className='manage-courses'>
                            <div className="course-info">
                                <h3>Course: </h3>
                                <img className='flag-image' src={flagSrc} alt={`${user.language} Flag`} /> {/* Country flag icon */}
                                <h3>{user.language}</h3>
                            </div>
                        </div>
                        <button className='reset-button' type="submit"onClick={() => navigate('/settingsManageCourses')}>Reset</button> {/* Submit button */}
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

export default SettingsManageCourses;