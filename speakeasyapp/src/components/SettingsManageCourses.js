import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
        languages: [],
        dailyTarget: 0,
    });
    const userID = localStorage.getItem('userID');
    const [currentLanguage, setCurrentLanguage] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('');

    useEffect(() => {
      Axios.get(`http://localhost:3000/user/${userID}`)
        .then((response) => {
          setUser(response.data);
          setCurrentLanguage(response.data.languages[0] || '');
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }, [userID]);
  
    const languageToFlag = {
      Spanish: 'spain.png',
      French: 'france.png',
      Italian: 'italy.png',
      German: 'germany.png',
    };

    const flagSrc = languageToFlag[currentLanguage] || 'default.png';

    const navigate = useNavigate(); // Assign the `useNavigate` hook to the variable `navigate`

    const handleLogout = () => {
        localStorage.removeItem('userID');
        window.location.href = '/';
      };
      
    const handleLanguageChange = (event) => {
        setSelectedLanguage(event.target.value);
      };
    
      
    const handleSubmit = (event) => {
      event.preventDefault();
      Axios.put(`http://localhost:3000/user/${userID}/update`, {
        languages: [selectedLanguage],
      })
        .then((response) => {
          console.log('Language updated successfully:', response.data);
          setUser((prevUser) => ({
            ...prevUser,
            languages: [selectedLanguage],
          }));
          setCurrentLanguage(selectedLanguage);
        })
        .catch((error) => {
          console.error('Error updating language:', error);
        });
    };

    return (
    <div className="mainpage-container">
      <div className="white-rectangle-container">
        <img src={Logo} alt="SpeakEasy" />
        <h1>Welcome, {user.firstName || 'Guest'}!</h1>
      </div>
      <div className="light-orange-rectangle" />
      <div className="bottom-container">
        <div className="navbar-container bottom-section">
          <ul>
            <li>
              <img src={Book} alt="Learn" />
              <Link to="/mainpage">Learn</Link>
            </li>
            <li>
              <img src={User} alt="Profile" />
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <img src={Settings} alt="Settings" />
              <Link to="/settings">Settings</Link>
            </li>
            <li>
              <img src={Help} alt="Help" />
              <Link to="/help">Help</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Log Out</button>
            </li>
          </ul>
        </div>
        <div className="settings-container bottom-section">
          <div className="left-of-settings-buttons-container">
            <div className="manage-courses-label">
              <h2>Manage Courses</h2>
            </div>
            <div className="manage-courses">
              <div className="course-info">
                <h3>Current Language: </h3>
                <img className="flag-image" src={`Flags/${flagSrc}`} alt={`${currentLanguage} Flag`} />
                <h3>{currentLanguage}</h3>
              </div>
            </div>
            <div className="select-container">
              <h3>Select New Language:</h3>
              <select value={selectedLanguage} onChange={handleLanguageChange}>
                <option value="">Choose a language</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="Italian">Italian</option>
                <option value="German">German</option>
              </select>
            </div>
            <button className="edit-daily-goal-button" type="submit" onClick={handleSubmit}>Update Language</button>
          </div>
          <div className="settings-buttons-container">
            <button
              className="settings-buttons"
              type="submit"
              onClick={() => navigate('/settings')}
            >
              Account
            </button>
            <button
              className="settings-buttons"
              type="submit"
              onClick={() => navigate('/settingsEditDailyGoal')}
            >
              Edit Daily Goals
            </button>
            <button
              className="settings-buttons"
              type="submit"
              onClick={() => navigate('/settingsManageCourses')}
            >
              Manage Courses
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsManageCourses;