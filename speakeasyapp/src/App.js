import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login.js';
import Signup from './components/Signup.js';
import About from './components/About.js';
import MainPage from './components/MainPage.js';
import SignupProgression2 from './components/SignupProgression2.js';
import SignupProgression3 from './components/SignupProgression3.js';
import Profile from './components/Profile.js';
import Settings from './components/Settings.js';
import SettingsEditDailyGoal from './components/SettingsEditDailyGoal.js';
import SettingsManageCourses from './components/SettingsManageCourses.js';
import Help from './components/Help.js';
import Section1Page from './components/Section1Page.js';
import Section2Page from './components/Section2Page.js';
import Section3Page from './components/Section3Page.js';
import Section4Page from './components/Section4Page.js';

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Route for the login page */}
                <Route path="/" element={<AboutWithLogin />} /> 
                {/* Route for the signup page */}
                <Route path="/signup" element={<AboutWithSignup />} /> 
                {/* Route for the main page */}
                <Route path="/mainpage" element={<MainPageWithBot />} />
                {/* Route for the SignupProgression2 */}
                <Route path="/signupProgression2" element={<AboutWithSignupProgression2 />} />    
                {/* Route for the SignupProgression3 */}
                <Route path="/signupProgression3" element={<AboutWithSignupProgression3 />} />   
                {/* Route for the Profile */}
                <Route path="/profile" element={<Profile />} /> 
                {/* Route for the Settings Account*/}
                <Route path="/settings" element={<Settings />} /> 
                {/* Route for the Settings Edit Daily Goal */}
                <Route path="/settingsEditDailyGoal" element={<SettingsEditDailyGoal />} />
                {/* Route for the Settings Manage Courses */}
                <Route path="/settingsManageCourses" element={<SettingsManageCourses />} />
                {/* Route for the Help */}
                <Route path="/help" element={<Help />} /> 
                <Route path="/section1" element={<Section1Page />} />
                <Route path="/section2" element={<Section2Page />} />
                <Route path="/section3" element={<Section3Page />} />
                <Route path="/section4" element={<Section4Page />} />
            </Routes>
        </Router>
    );
};


/* Component for the login page */
const AboutWithLogin = () => {
    return (
        <div className='full-page-container'>
            <About /> {/* Render the About component */}
            <Login /> {/* Render the Login component */}
        </div>
    );
};

/* Component for the signup page */
const AboutWithSignup = () => {
    return (
        <div className='full-page-container'>
            <About /> {/* Render the About component */}
            <Signup /> {/* Render the Signup component */}
        </div>
    );
};

/* Component for the main page */
const MainPageWithBot = () => {
    return (
        <div className='full-page-container'>
            <MainPage /> {/* Render the MainPage component */}
                    </div>
    );
};

/* Component for the signup progression 2 page */
const AboutWithSignupProgression2 = () => {
    return (
        <div className='full-page-container'>
            <About /> {/* Render the About component */}
            <SignupProgression2 /> {/* Render the SignupProgression2 component */}
        </div>
    );
};

/* Component for the signup progression 3 page */
const AboutWithSignupProgression3 = () => {
    return (
        <div className='full-page-container'>
            <About /> {/* Render the About component */}
            <SignupProgression3 /> {/* Render the SignupProgression3 component */}
        </div>
    );
};

export default App;