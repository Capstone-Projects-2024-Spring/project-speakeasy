import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styles/MainPage.css';
import Logo from './assets/Logo.png';
import Help from './assets/Help.png';
import Book from './assets/Book.png';
import User from './assets/User.png';
import Settings from './assets/Settings.png';
import Trophy from './assets/Trophy.png';
import Axios from 'axios';

// MainPage component
const MainPage = () => {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        language: '',
        dailyTarget: 0,
    });

    const [progressPercentage, setProgressPercentage] = useState(0);
    const userID = localStorage.getItem('userID');

    useEffect(() => {
        Axios.get(`http://localhost:3000/user/${userID}`)
        .then(response => {
            setUser(response.data); // Update the user state with the fetched data
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });

        const loginTime = localStorage.getItem('loginTime');

        // Calculate progress percentage
        if (loginTime) {
            const currentTime = new Date().getTime();
            const timeDifference = (currentTime - parseInt(loginTime)) / 60000;
            const progress = (timeDifference / user.dailyTarget) * 100;

            setProgressPercentage(progress);
        }
    }, [user.dailyTarget]);

    const handleLogout = () => {
        localStorage.removeItem('userID');
        // Redirect to login route
        window.location.href = '/';
    };

    return (
        <div className='mainpage-container'> {/* Main container */}
            <div className='white-rectangle-container'> {/* Container for top section */}
                <img src={Logo} alt="SpeakEasy" /> {/* Logo */}
                <h1>Welcome, {user.firstName || "Guest"}!</h1> {/* Welcome message */}
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
                            <p>Daily Goal:</p>
                        <li> 
                            <progress value={progressPercentage} max="100"/>
                        </li>
                        <li>
                            <button onClick={handleLogout}>Log Out</button> {/* Logout button */}
                        </li>
                    </ul>
                </div>
                <div className='lesson-container bottom-section'> {/* Lesson container */}
                    <div className='white-container'> {/* White container for lesson section */}
                        <div className='content-container'> {/* Container for lesson content */}
                        <Link to="/section1"><h3>Chat Room</h3></Link> {/* This line in MainPage makes Section 1 heading clickable and links to the Section1Page */}
                            <img src={Trophy} alt="Trophy" /> {/* Trophy icon */}
                        </div>
                    </div>
                    <div className='white-container'> {/* Additional sections unchanged */}
                        <div className='content-container'>
                            <Link to="/section2"><h3>Translator</h3></Link>
                            <img src={Trophy} alt="Trophy" />
                        </div>
                    </div>
                    <div className='white-container'>
                        <div className='content-container'>
                            <Link to="/section3"><h3>Role Playing</h3></Link>
                            <img src={Trophy} alt="Trophy" />
                        </div>
                    </div>
                    <div className='white-container'>
                        <div className='content-container'>
                            <Link to="/section4"><h3>Vocab Practice</h3></Link>
                            <img src={Trophy} alt="Trophy" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainPage;
