import React from 'react';
import { Link } from 'react-router-dom';
import './styles/MainPage.css';

import Logo from './assets/Logo.png';
import Help from './assets/Help.png';
import Book from './assets/Book.png';
import User from './assets/User.png';
import Settings from './assets/Settings.png';
import Trophy from './assets/Trophy.png';

// MainPage component
const MainPage = () => {
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
                <div className='lesson-container bottom-section'> {/* Lesson container */}
                    <div className='white-container'> {/* White container for lesson section */}
                        <div className='content-container'> {/* Container for lesson content */}
                        <Link to="/section1"><h3>Section 1</h3></Link> {/* This line in MainPage makes Section 1 heading clickable and links to the Section1Page */}
                            <img src={Trophy} alt="Trophy" /> {/* Trophy icon */}
                        </div>
                        <progress value={0.5} /> {/* Progress bar */}
                    </div>
                    <div className='white-container'> {/* Additional sections unchanged */}
                        <div className='content-container'>
                            <h3>Section 2</h3>
                            <img src={Trophy} alt="Trophy" />
                        </div>
                        <progress value={0.5} />
                    </div>
                    <div className='white-container'>
                        <div className='content-container'>
                            <h3>Section 3</h3>
                            <img src={Trophy} alt="Trophy" />
                        </div>
                        <progress value={0.5} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainPage;
