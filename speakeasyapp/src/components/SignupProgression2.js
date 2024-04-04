import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './styles/MainPage.css';  

import Globe from './assets/Globe.png';

// SignupProgression2 component
const SignupProgression2 = () => {

    const [selectedLanguage, setSelectedLanguage] = useState('Spanish'); // State to store selected language

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        console.log('Selected Language:', selectedLanguage);  // Log selected language
        navigate('/signupProgression3'); // Navigate to next step (replace with actual URL)
    };

    const navigate = useNavigate(); // Assign the `useNavigate` hook to the variable `navigate`

    return (
        <div className="i-want-to-learn-container">
            <h2>I want to learn...</h2> {/* I Want to Learn heading */}
            <form onSubmit={handleSubmit} className="i-want-to-learn-form"> {/* I Want to Learn form */}
                <div className='select-container'> 
                    <img src={Globe} alt="Language" /> {/* Language icon */}
                    <select
                    value={selectedLanguage}  // Set select value based on state
                    onChange={(event) => setSelectedLanguage(event.target.value)}
                    >
                        <option value="Spanish">Spanish</option> 
                        <option value="French">French</option>
                        <option value="Chinese">Chinese</option> 
                    </select>
                </div>
                <button type="submit">Submit</button> {/* Submit button */}
            </form>
        </div>
    );
};

export default SignupProgression2;
