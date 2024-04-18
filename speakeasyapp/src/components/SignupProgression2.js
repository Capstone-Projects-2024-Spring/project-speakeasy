import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './styles/MainPage.css';  
import Axios from 'axios';
import Globe from './assets/Globe.png';

// SignupProgression2 component
const SignupProgression2 = () => {
    const [selectedLanguage, setSelectedLanguage] = useState('English'); // State to store selected language
    const navigate = useNavigate(); // Assign the `useNavigate` hook to the variable `navigate`

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        const userID = localStorage.getItem('userID'); // Get the user ID from localStorage
        console.log("Language changed to:", event.target.value);
        if (!userID) {
            alert('User ID not found. Please sign in again.');
            navigate('/'); // Redirect to the home page or sign in page
            return;
        }

        // Perform the PUT request to update the user's selected language
        Axios.put(`http://localhost:3000/user/${userID}/update`, {
            languages: [selectedLanguage]
        })
        .then(res => {
            console.log('Language updated successfully:', res.data);
            navigate('/signupProgression3'); // Navigate to the next step
        })
        .catch(error => {
            console.error('Failed to update language:', error);
            alert('Failed to update language. Please try again.');
        });
    };

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
