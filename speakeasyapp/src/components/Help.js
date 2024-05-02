import React from 'react';
import { Link } from 'react-router-dom';
import './styles/MainPage.css'; 
import './styles/Help.css'; 

import Logo from './assets/Logo.png'; 
import Help from './assets/Help.png'; 
import Book from './assets/Book.png'; 
import User from './assets/User.png'; 
import Settings from './assets/Settings.png'; 

// Help page component
const HelpPage = () => {

    const handleLogout = () => {
        localStorage.removeItem('userID');
        // Redirect to login route
        window.location.href = '/';
    };
    
    return (
        <div className='mainpage-container'> {/* Main container */}
            <div className='white-rectangle-container'> {/* Container for top section */}
                <img src={Logo} alt="SpeakEasy" /> {/* Logo */}
                <h1>Help</h1> {/* Help header */}
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
                <div className='help-container bottom-section'> {/* Help container */}
                    <div className='help-text-container'>
                        <h2>Help Page</h2>
                        <h3>Go to "Learn" to check your progress on the language you are learning. You can access the language tutor bot from there!</h3>
                        <h3>Go to "Profile" to see your profile page!</h3>
                        <h3>Go to "Settings" to further customize your experience using SpeakEasy! You can edit your account details, daily goal, and manage your courses!</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HelpPage;