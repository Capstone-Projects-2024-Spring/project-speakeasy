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
import Clock from './assets/Clock.png';

// Settings edit daily goal component
const SettingsEditDailyGoal = () => {

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
            setUser(response.data);
          })
          .catch(error => {
            console.error('Error fetching user data:', error);
          });
      }, [userID]);

      const [selectedDailyTarget, setSelectedDailyTarget] = useState(user.dailyTarget.toString());

      const handleSubmit = (event) => {
        event.preventDefault();
        Axios.put(`http://localhost:3000/user/${userID}/update`, {
          dailyTarget: parseInt(selectedDailyTarget),
        })
          .then((response) => {
            console.log('Daily target updated successfully:', response.data);
            setUser((prevUser) => ({
              ...prevUser,
              dailyTarget: parseInt(selectedDailyTarget),
            }));
            // Optionally, you can show a success message or redirect to another page
          })
          .catch((error) => {
            console.error('Error updating daily target:', error);
            // Optionally, you can show an error message
          });
      };

    const navigate = useNavigate(); // Assign the `useNavigate` hook to the variable `navigate`

    const handleLogout = () => {
        localStorage.removeItem('userID');
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
                        <li><button onClick={handleLogout}>Log Out</button></li>
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
                            <select value={selectedDailyTarget}
              onChange={(event) => setSelectedDailyTarget(event.target.value)}> {/* Time dropdown */}
                                <option value="10">10</option> 
                                <option value="20">20</option>
                                <option value="30">30</option>
                            </select>
                        </div>
                        <button className='edit-daily-goal-button' type="submit"onClick={handleSubmit}>Submit</button> {/* Submit button */}
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